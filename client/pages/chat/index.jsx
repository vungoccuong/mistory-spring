import React, { useEffect, useState } from 'react';
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
import { request } from 'universal-rxjs-ajax';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
async function getCurrentUser() {
	if (process.browser) {
		const user = await request({
			url: '/spring/user/current',
			withCredentials: true,
		})
			.pipe(
				map(res => res.response),
				catchError(() => of({})),
			)
			.toPromise();
		const { fullName, username, avatar } = user;
		return { fullName, username, avatar };
	}
	return {};
}
function Chat({
	initChannel,
	loginSuccess,
	pushMessage,
	updateLastMessage,
	pushTyping,
	updateOnlineState,
}) {
	const router = useRouter();
	const [isInit, setInit] = useState(false);
	const queryRoomId = router.query.roomId;
	useEffect(() => {
		getCurrentUser().then(user => {
			if (!user || !user.username) {
				router.replace('/login');
			}
			if (user && user.username) {
				setInit(true);
			}
			loginSuccess(user);
		});
	}, []);
	useEffect(() => {
		if (isInit) {
			initChannel();
		}
	}, [isInit]);
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
	}, [queryRoomId, isInit]);
	if (!isInit) return <MainLayout />;
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

export default connect(
	state => ({
		rooms: state.channel.rooms,
	}),
	{ initChannel, loginSuccess, pushMessage, updateLastMessage, pushTyping, updateOnlineState },
)(Chat);
