import React from 'react';
import './room.scss';
import { Avatar, Icon } from 'antd';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Link from 'next/link';
function Summary({ content }) {
	if (!content) return <></>;
	if (typeof content === 'string') {
		return <>{content.substring(0, 20)}</>;
	} else {
		return (
			<div>
				<Icon type="paper-clip" />
				Tệp đính kèm
			</div>
		);
	}
}
function Room({ name, lastMessage, updatedAt, avatar, _id }) {
	const router = useRouter();
	const roomId = router.query.roomId;
	const roomClass = classNames('gin-room', {
		active: roomId === _id,
	});
	return (
		<Link href="/chat/[roomId]" as={`/chat/${_id}`}>
			<div className={roomClass}>
				<div className="gin-left">
					<Avatar style={{ color: '#444446', backgroundColor: '#ffffff' }} size={46}>
						{avatar}
					</Avatar>
				</div>
				<div className="gin-center">
					<div className="gin-room-info">
						<div className="gin-room-name">{name}</div>
						<div className="gin-room-message">
							<div className="gin-content">
								<Summary content={lastMessage && lastMessage.content} />
							</div>
							<div className="gin-date">
								{new Date(updatedAt).toLocaleTimeString()}
							</div>
						</div>
					</div>
				</div>
				<div className="gin-right" />
			</div>
		</Link>
	);
}

export default connect(state => ({
	currentUsername: state.user.username,
}))(Room);
