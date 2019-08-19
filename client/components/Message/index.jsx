import React from 'react';
import './index.scss';
import { Tooltip } from 'antd';
function Message({ message }) {
	return (
		<Tooltip title={new Date(message.date).toLocaleString()}>
			<div className="gin-message">{message.content}</div>
		</Tooltip>
	);
}

export default Message;
