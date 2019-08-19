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
import { getConnection } from '../../utils/websocket';
import { MESSAGE, TYPING } from '../../utils/evenTypes';
import { useRouter } from 'next/router';
import { pushMessage } from '../../redux/actions/message';
import { pushTyping } from '../../redux/actions/room';
function Chat({
	initChannel,
	currentUser,
	loginSuccess,
	pushMessage,
	updateLastMessage,
	pushTyping,
}) {
	const router = useRouter();
	const queryRoomId = router.query.roomId;
	useEffect(() => {
		initChannel();
		loginSuccess(currentUser);
	}, []);

	useEffect(() => {
		const connection = getConnection()
			.onEvent(MESSAGE, data => {
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
			});
	}, [queryRoomId]);

	return (
		<MainLayout>
			<div className="chat">
				<Row>
					<Col md={5}>
						<ChatList />
					</Col>
					<Col md={14}>
						<ChatBox />
					</Col>
					<Col md={5}>
						<ChatTool />
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
	{ initChannel, loginSuccess, pushMessage, updateLastMessage, pushTyping },
)(Chat);
