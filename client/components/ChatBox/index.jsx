import React, { useEffect } from 'react';
import ChatInput from '../ChatInput';
import MessagesBox from '../MessagesBox';
import './index.scss';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Loading from '../Loading';
import { messageLoading } from '../../redux/actions/message';
function ChatBox({ rooms, messageLoading }) {
	const router = useRouter();
	const queryRoomId = router.query.roomId;
	if (queryRoomId) {
	} else if (rooms.length) {
		const first = rooms[0];
		router.replace(`/chat/${first._id}`);
	}
	useEffect(() => {
		if(queryRoomId) {
			messageLoading(queryRoomId);
		}
	}, [queryRoomId]);
	return (
		<div className="gin-chat-box">
			{queryRoomId ? <MessagesBox /> : <Loading />}
			<ChatInput />
		</div>
	);
}

export default connect(
	state => ({ rooms: state.channel.rooms }),
	{ messageLoading },
)(ChatBox);
