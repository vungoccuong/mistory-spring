import React, { useEffect, useMemo, useRef } from 'react';
import './index.scss';
import MessageGroup from '../MessageGroup';
import { connect } from 'react-redux';

function MessagesBox({ messages }) {
	const ref = useRef(null);
	useEffect(() => {
		if (ref.current) {
			const chat = ref.current;
			const timeScroll = process.env.NODE_ENV === 'production' ? 100 : 1000;
			setTimeout(() => {
				scrollBottom(chat);
			}, timeScroll);
		}
	}, []);
	useEffect(() => {
		if (ref.current) {
			const chat = ref.current;
			if (chat.scrollHeight - chat.scrollTop - 300 < chat.clientHeight) {
				scrollBottom(chat);
			}
		}
	}, [messages]);
	const scrollBottom = chat => {
		const scrollHeight = chat.scrollHeight;
		const clientHeight = chat.clientHeight;
		const distanceToTop = scrollHeight - clientHeight;
		scrollTop(chat, distanceToTop > 0 ? distanceToTop : 0);
	};
	const scrollTop = (chat, height) => (chat.scrollTop = height);
	const groups = useMemo(() => {
		let grs = [];
		messages.sort((a, b) => a.date.localeCompare(b.date));
		return messages.map((message, index) => {
			grs.push(message);
			if (!messages[index + 1] || messages[index + 1].sender !== message.sender) {
				let _temp = grs;
				grs = [];
				return <MessageGroup key={index} messages={_temp} />;
			}
			return null;
		});
	}, [messages]);
	return (
		<div ref={ref} className="gin-messages-box">
			{groups}
		</div>
	);
}

export default connect(state => ({ messages: state.room.messages }))(MessagesBox);
