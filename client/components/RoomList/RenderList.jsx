import React from 'react';
import Room from './Room';
import './index.scss';
import { connect } from 'react-redux';
import Loading from '../Loading';
function RenderList({ rooms, channelLoading }) {
	return (
		<div className="gin-render-list">
			{!channelLoading ? (
				rooms.map((room, index) => <Room {...room} key={index} />)
			) : (
				<Loading />
			)}
		</div>
	);
}

export default connect(state => ({
	channelLoading: state.channel.isFetching,
	rooms: state.channel.rooms,
}))(RenderList);
