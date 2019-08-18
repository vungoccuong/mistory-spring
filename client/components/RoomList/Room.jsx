import React, { useMemo } from 'react';
import './room.scss';
import { Avatar } from 'antd';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import classNames from 'classnames';
function Room({ name, lastMessage, updatedAt, avatar, _id }) {
	const router = useRouter();
	const roomId = router.query.roomId;
	const roomClass = classNames('gin-room', {
		active: roomId === _id,
	});
	const onClick = () => roomId !== _id && router.push(`/chat/${_id}`);
	return (
		<div className={roomClass} onClick={onClick}>
			<div className="gin-left">
				<Avatar style={{ color: '#444446', backgroundColor: '#ffffff' }} size={46}>
					{avatar}
				</Avatar>
			</div>
			<div className="gin-center">
				<div className="gin-room-info">
					<div className="gin-room-name">{name}</div>
					<div className="gin-room-message">
						<div className="gin-content">{lastMessage && lastMessage.content}</div>
						<div className="gin-date">{new Date(updatedAt).toLocaleTimeString()}</div>
					</div>
				</div>
			</div>
			<div className="gin-right"></div>
		</div>
	);
}

export default connect(state => ({
	currentUsername: state.user.username,
}))(Room);
