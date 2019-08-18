import React from 'react';
import { Input } from 'antd';
import './index.scss';
function RoomSearcher() {
	return (
		<div className="gin-room-searcher">
			<Input.Search placeholder="Tìm kiếm bạn bè" />
		</div>
	);
}
export default RoomSearcher;
