import React from 'react';
import RenderList from './RenderList';
import { connect } from 'react-redux';

function RoomList() {
	return (
		<div className="gin-room-list">
			<RenderList />
		</div>
	);
}

export default RoomList;
