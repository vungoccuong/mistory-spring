import React, { useCallback, useMemo } from 'react';
import { Avatar, Button, Dropdown, Icon, Layout, Menu } from 'antd';
const AntHeader = Layout.Header;
import './index.scss';
import { connect } from 'react-redux';
import Link from 'next/link';
import { request } from 'universal-rxjs-ajax';
import { useRouter } from 'next/router';
async function logout() {
	if (process.browser) {
		const res = await request({
			url: '/spring/user/logout',
			withCredentials: true,
		}).toPromise();
		console.log(res);
		return true;
	}
	return false;
}

function Header({ username, avatar, fullName }) {
	const router = useRouter();
	const onLogout = useCallback(() => {
		logout().then(result => {
			if (result) {
				router.replace('/login');
			}
		});
	});
	const menu = useMemo(
		() => (
			<Menu>
				<Menu.Item key="1" disabled>
					<Icon type="user" />
					Usr: {username}
				</Menu.Item>
				<Menu.Item key="2" disabled>
					<Icon type="contacts" />
					Fn: {fullName}
				</Menu.Item>
				<Menu.Item key="3">
					<div onClick={onLogout}>
						<a>Đăng xuất</a>
					</div>
				</Menu.Item>
			</Menu>
		),
		[username, avatar, fullName],
	);

	return (
		<AntHeader className="gin-header">
			<div className="left-bar">
				<div className="logo">
					<Button>My logo</Button>
				</div>
			</div>
			<div className="right-bar">
				<div className="avatar">
					{username && (
						<Dropdown trigger={['click']} overlay={menu}>
							<Avatar
								style={{ backgroundColor: '#fff', color: '#6c757d' }}
								alt={fullName}
								src={avatar}
							>
								{fullName.substring(0, 2).toUpperCase()}
							</Avatar>
						</Dropdown>
					)}
				</div>
			</div>
		</AntHeader>
	);
}

export default connect(state => ({ ...state.user }))(Header);
