import React from 'react';
import { Input } from 'antd';
import './index.scss';
function RoomSearcher() {
	const onSearch = value => {
		console.log(value);
	};
	return (
		<div className="gin-room-searcher">
			<Input.Search placeholder="Tìm kiếm bạn bè" onSearch={onSearch} />
		</div>
	);
}
export default RoomSearcher;
