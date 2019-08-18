import React from 'react';
import Message from '../Message';
import { Avatar } from 'antd';
import classNames from 'classnames';
import './index.scss';
import { connect } from 'react-redux';
function MessageGroup({ messages, username }) {
	if (messages.length <= 0) return <></>;
	const firstMessage = messages[0];
	const right = firstMessage.sender === username;
	const grClass = classNames('gin-message-group', { right });
	return (
		<div className={grClass}>
			<div className="gin-msg-gr-container">
				<div className="gin-msg-gravt-container">
					<Avatar>HU</Avatar>
				</div>
				{messages.map((message, index) => {
					return <Message message={message} key={index} />;
				})}
			</div>
		</div>
	);
}

export default connect(state => ({ username: state.user.username }))(MessageGroup);
