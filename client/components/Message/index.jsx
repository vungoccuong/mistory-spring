import React from 'react';
import './index.scss';
import { Tooltip } from 'antd';
import FileMessage from '../FileMessage';
function Message({ message: { date, content } }) {
	if (typeof content === 'string') {
		return (
			<Tooltip title={new Date(date).toLocaleString()}>
				<div className="gin-message">{content}</div>
			</Tooltip>
		);
	} else {
		return (
			<Tooltip title={new Date(date).toLocaleString()}>
				<div className="gin-message">
					<FileMessage {...content} />
				</div>
			</Tooltip>
		);
	}
}

export default Message;
