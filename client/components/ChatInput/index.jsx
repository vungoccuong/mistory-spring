import React, { useMemo, useState } from 'react';
import './index.scss';
import { Icon, Input } from 'antd';
import { connection } from '../../utils/websocket';
import { useRouter } from 'next/router';
import { MESSAGE } from '../../utils/evenTypes';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import Emoji from '../Emoji';
function ChatInput(props) {
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
		connection.emitEvent(MESSAGE, {
			content: value,
			roomId,
		});
		setValue('');
	};
	const addEmoji = emoji => {
		setValue(value + emoji.native);
	};
	return (
		<div className="gin-chat-input">
			<div>
				<Emoji addEmoji={addEmoji} />
				<div className="gin-message-textarea">
					<Input.TextArea
						placeholder="Gõ gì đi ......."
						onChange={({ target: { value } }) => onChange(value)}
						onPressEnter={onEnter}
						value={value}
					/>
				</div>
				<div className="gin-file-send">
					<Icon type="paper-clip" style={{ fontSize: 30, color: '#fff' }} />
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
