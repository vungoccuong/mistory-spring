import React, { useEffect } from 'react';
import ChatInput from '../ChatInput';
import MessagesBox from '../MessagesBox';
import './index.scss';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Loading from '../Loading';
import { messageLoading } from '../../redux/actions/message';
import Router from 'next/router';
function ChatBox({ rooms, messageLoading, isRoomLoading }) {
	const router = useRouter();
	const queryRoomId = router.query.roomId;

	useEffect(() => {
		if (queryRoomId) {
			messageLoading(queryRoomId);
		}
	}, [queryRoomId]);
	useEffect(() => {
		if (rooms.length && !queryRoomId) {
			const first = rooms[0];
			Router.push(`/chat/${first._id}`);
		}
	}, [queryRoomId, rooms]);
	return (
		<div className="gin-chat-box">
			{queryRoomId ? <MessagesBox /> : <Loading />}
			<ChatInput />
		</div>
	);
}

export default connect(
	state => ({ rooms: state.channel.rooms, isRoomLoading: state.channel.isFetching }),
	{ messageLoading },
)(ChatBox);
