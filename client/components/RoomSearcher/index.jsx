import React from 'react';
import { Input } from 'antd';
import './index.scss';
import { connect } from 'react-redux';
import { initChannel, searchRoom } from '../../redux/actions/channel';
function RoomSearcher({ searchRoom, initChannel }) {
	const onSearch = value => {
		if (value) {
			searchRoom(value);
		} else {
			initChannel();
		}
	};
	return (
		<div className="gin-room-searcher">
			<Input.Search placeholder="Tìm kiếm bạn bè" onSearch={onSearch} />
		</div>
	);
}
export default connect(
	null,
	{ searchRoom, initChannel },
)(RoomSearcher);
