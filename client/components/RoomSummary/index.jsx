import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Avatar, Tag, Tooltip } from 'antd';
import './index.scss';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Loading from '../Loading';
import { getConnection } from '../../utils/websocket';
import { ONLINE } from '../../utils/evenTypes';
function getFriendUsername(memberNames, username) {
	let result = memberNames[0];
	for (let name of memberNames) {
		if (username !== name) {
			result = name;
			break;
		}
	}
	return result;
}
function RoomSummary({ rooms, online, username }) {
	const [loading, setLoading] = useState(false);
	const [room, setRoom] = useState({});
	const router = useRouter();
	const roomId = router.query.roomId;
	useEffect(() => {
		if (!roomId) {
			setLoading(true);
		}
	}, [roomId]);
	//compute
	let roomCompute = useCallback(() => {
		const r = rooms.find(room => room._id === roomId);
		if (!r) return {};
		const members = r.members;
		const friendUsername = getFriendUsername(members.map(i => i.username), username);
		return { ...r, friendUsername };
	}, [rooms, roomId, username]);
	useEffect(() => {
		const room = roomCompute();
		setRoom(room);
		const friendUsername = room.friendUsername;
		getConnection().emitEvent(ONLINE, friendUsername);
	}, [rooms, roomId]);
	return (
		<div className="gin-room-summary">
			{loading ? (
				<Loading />
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
	username: state.user.username,
}))(RoomSummary);
