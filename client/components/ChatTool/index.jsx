import React, { useCallback, useMemo } from 'react';
import './index.scss';
import RoomSummary from '../RoomSummary';
import GroupInviter from '../GroupInviter';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
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
function ChatTool({ rooms, username }) {
	const router = useRouter();
	const roomId = router.query.roomId;
	let room = useMemo(() => {
		if (!rooms) return {};
		const r = rooms.find(room => room._id === roomId);
		if (!r) return {};
		const members = r.members;
		const friendUsername = getFriendUsername(members.map(i => i.username), username);
		return { ...r, friendUsername };
	}, [rooms, roomId, username]);
	return (
		<div className="gin-chat-tool">
			<RoomSummary room={room} />
			<GroupInviter room={room} />
		</div>
	);
}

export default connect(state => ({ username: state.user.username, rooms: state.channel.rooms }))(
	ChatTool,
);
