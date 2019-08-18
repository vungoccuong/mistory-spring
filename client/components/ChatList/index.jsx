import React from 'react';
import RoomSearcher from '../RoomSearcher';
import RoomList from '../RoomList';
import './index.scss';
function ChatList() {
	return (
		<div className="gin-chat-list">
			<RoomSearcher />
			<RoomList />
		</div>
	);
}

export default ChatList;
