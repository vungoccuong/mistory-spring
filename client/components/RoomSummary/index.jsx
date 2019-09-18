import React, { useEffect, useState } from 'react';
import { Avatar, Tag, Tooltip } from 'antd';
import './index.scss';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Loading from '../Loading';
import { getStompConnection } from '../../utils/stomp';

function RoomSummary({ rooms, online, room }) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const roomId = router.query.roomId;
	useEffect(() => {
		if (!roomId) {
			setLoading(true);
		}
	}, [roomId]);
	//compute
	useEffect(() => {
		if (room) {
			const friendUsername = room.friendUsername;
			getStompConnection().checkIsOnline(friendUsername);
		}
	}, [rooms, roomId, room]);
	return (
		<div className="gin-room-summary">
			{loading ? (
				<Loading/>
			) : (
				<div className="gin-room-summary-container">
					<Avatar style={{ color: '#444446', backgroundColor: '#ffffff' }} size={76}>
						{room.avatar}
					</Avatar>
					<p className="gin-room-name">{room.name}</p>
					<Tooltip
						title={
							online === true
								? 'Đang hoạt động'
								: !online
								? 'Không xác định'
								: new Date(online).toLocaleString()
						}
					>
						<Tag color={online === true ? 'green' : !online ? 'volcano' : 'purple'}>
							{room.friendUsername}
						</Tag>
					</Tooltip>
				</div>
			)}
		</div>
	);
}

export default connect(state => ({
	rooms: state.channel.rooms,
	online: state.room.online,
}))(RoomSummary);
