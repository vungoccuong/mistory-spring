import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Avatar } from 'antd';
import './index.scss';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Loading from '../Loading';
function RoomSummary({ rooms, online }) {
	const [loading, setLoading] = useState(false);
	const [room, setRoom] = useState({});
	const router = useRouter();
	const roomId = router.query.roomId;
	useEffect(() => {
		if (!roomId) {
			setLoading(true);
		}
	}, [roomId]);
	let roomCompute = useCallback(() => rooms.find(room => room._id === roomId) || {}, [
		rooms,
		roomId,
	]);

	useEffect(() => {
		setRoom(roomCompute());
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
					<p>
						{online === true
							? 'Đang hoạt động'
							: !online
							? 'Không xác định'
							: new Date(online).toLocaleString()}
					</p>
				</div>
			)}
		</div>
	);
}

export default connect(state => ({ rooms: state.channel.rooms, online: state.room.online }))(
	RoomSummary,
);
