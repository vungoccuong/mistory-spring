import React, { useCallback, useMemo, useState } from 'react';
import './index.scss';
import { Icon, Input } from 'antd';
import { getConnection } from '../../utils/websocket';
import { useRouter } from 'next/router';
import { MESSAGE, TYPING } from '../../utils/evenTypes';
import 'emoji-mart/css/emoji-mart.css';
import Emoji from '../Emoji';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import TypingBox from '../ChatBox/TypingBox';
import FileUploader from './FileUploader';
import { getStompConnection } from '../../utils/stomp';

function ChatInput() {
	const [value, setValue] = useState('');
	const router = useRouter();
	const roomId = router.query.roomId;
	const onChange = useMemo(() => {
		return e => {
			setValue(e);
		};
	}, []);
	const onEnter = e => {
		if (!e.shiftKey) {
			if (!roomId) {
				return;
			}
			e.preventDefault();
			send();
		}
	};
	const onClickSend = () => {
		if (value) {
			send();
		}
	};
	const send = () => {
		sendTyping(roomId, false);
		getStompConnection().sendMessage(roomId, value);
		// getConnection().emitEvent(MESSAGE, {
		// 	content: value,
		// 	roomId,
		// });
		setValue('');
	};
	const addEmoji = emoji => {
		setValue(value + emoji.native);
	};
	const throttleSendNotTyping = useMemo(() => {
		const subject = new Subject();
		subject.pipe(throttleTime(200)).subscribe(() => {
			sendTyping(roomId, false);
		});
		return isTyping => subject.next(isTyping);
	}, [roomId]);
	const throttleSendTyping = useMemo(() => {
		const subject = new Subject();
		subject.pipe(throttleTime(1000)).subscribe(() => {
			sendTyping(roomId, true);
		});
		return isTyping => subject.next(isTyping);
	}, [roomId]);
	const sendTyping = (room, isTyping) => {
		getStompConnection().sendTyping(room, isTyping);
		// getConnection().emitEvent(TYPING, {
		// 	room,
		// 	isTyping,
		// });
	};
	const onChangeValue = ({ target: { value } }) => {
		onChange(value);
		if (value) {
			throttleSendTyping();
		} else {
			throttleSendNotTyping();
		}
	};
	return (
		<div className="gin-chat-input">
			<div>
				<TypingBox/>
				<Emoji addEmoji={addEmoji}/>
				<div className="gin-message-textarea">
					<Input.TextArea
						placeholder="Gõ gì đi ......."
						onChange={onChangeValue}
						onPressEnter={onEnter}
						value={value}
					/>
				</div>
				<div className="gin-file-send">
					<FileUploader/>
					<Icon
						type="export"
						style={{ fontSize: 30, color: '#fff' }}
						onClick={onClickSend}
					/>
				</div>
			</div>
		</div>
	);
}

export default ChatInput;
