import React from 'react';
import { Avatar, Button, Layout } from 'antd';
const AntHeader = Layout.Header;
import './index.scss';
import { connect } from 'react-redux';
function Header({ username, avatar, fullName }) {
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
						<Avatar
							style={{ backgroundColor: '#fff', color: '#6c757d' }}
							alt={fullName}
							src={avatar}
						>
							{fullName.substring(0, 2).toUpperCase()}
						</Avatar>
					)}
				</div>
			</div>
		</AntHeader>
	);
}

export default connect(state => ({ ...state.user }))(Header);
