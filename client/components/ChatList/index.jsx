import React from 'react';
import RoomSearcher from '../RoomSearcher';
import RoomList from '../RoomList';
import './index.scss';
import GroupMaker from '../GroupMaker';
function ChatList() {
	return (
		<div className="gin-chat-list">
			<GroupMaker />
			<RoomSearcher />
			<RoomList />
		</div>
	);
}

export default ChatList;
