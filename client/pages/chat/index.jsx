import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import './index.scss';
import { Col, Row } from 'antd';
import ChatList from '../../components/ChatList';
import ChatBox from '../../components/ChatBox';
import ChatTool from '../../components/ChatTool';
import { initChannel, updateLastMessage } from '../../redux/actions/channel';
import { connect } from 'react-redux';
import { loginSuccess } from '../../redux/actions/user';
import { useRouter } from 'next/router';
import { pushMessage } from '../../redux/actions/message';
import { pushTyping, updateOnlineState } from '../../redux/actions/room';
import { getStompConnection } from '../../utils/stomp';
import { ONLINE, TEXT, TYPING } from '../../utils/stompEventType';

function Chat({
				  initChannel,
				  currentUser,
				  loginSuccess,
				  pushMessage,
				  updateLastMessage,
				  pushTyping,
				  updateOnlineState,
				  online,
			  }) {
	const router = useRouter();
	const queryRoomId = router.query.roomId;
	useEffect(() => {
		initChannel();
		loginSuccess(currentUser);
	}, []);

	useEffect(() => {
		if (queryRoomId) {
			getStompConnection()
				.onEvent(TEXT, data => {
					const { room } = data;
					if (room === queryRoomId) {
						//
						pushMessage(data);
					}
					updateLastMessage(data);
				})
				.onEvent(TYPING, data => {
					const { room } = data;
					if (room === queryRoomId) {
						pushTyping(data);
					}
				})
				.onEvent(ONLINE, ({ online }) => {
					console.log('fired');
					updateOnlineState(online);
				});
			return () => getStompConnection().dispose();
		}
	}, [queryRoomId]);

	return (
		<MainLayout>
			<div className="chat">
				<Row>
					<Col md={5}>
						<ChatList/>
					</Col>
					<Col md={14}>
						<ChatBox/>
					</Col>
					<Col md={5}>
						<ChatTool/>
					</Col>
				</Row>
			</div>
		</MainLayout>
	);
}

Chat.getInitialProps = async ({ req }) => {
	const { fullName, username, avatar } = (req && req.user) || {};
	return { currentUser: { fullName, username, avatar } };
};
export default connect(
	state => ({
		rooms: state.channel.rooms,
	}),
	{ initChannel, loginSuccess, pushMessage, updateLastMessage, pushTyping, updateOnlineState },
)(Chat);
