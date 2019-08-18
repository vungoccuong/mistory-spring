import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Input, Form, Alert } from 'antd';
import './form.scss';
import { login } from '../../redux/actions/user';
import Link from 'next/link';
import usePrevious from '../../hooks/usePrevious';
import { useRouter } from 'next/router';

const _Form = ({ error, login, form: { getFieldDecorator, validateFields }, username }) => {
	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				login(values.username, values.password);
			}
		});
	};
	const router = useRouter();
	const prevUserName = usePrevious(username);
	useEffect(() => {
		if (!prevUserName && username) {
			router.push('/');
		}
		router.prefetch('/');
	}, [username]);

	return (
		<div className="gin-login-form">
			<Form onSubmit={handleSubmit} className="login-form">
				<Form.Item>
					{getFieldDecorator('username', {
						rules: [
							{
								required: true,
								message: 'Please input your username!',
							},
						],
					})(
						<Input
							prefix={
								<Icon
									type="user"
									style={{
										color: 'rgba(0,0,0,.25)',
									}}
								/>
							}
							placeholder="Username"
						/>,
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [
							{
								required: true,
								message: 'Please input your Password!',
							},
						],
					})(
						<Input
							prefix={
								<Icon
									type="lock"
									style={{
										color: 'rgba(0,0,0,.25)',
									}}
								/>
							}
							type="password"
							placeholder="Password"
						/>,
					)}
				</Form.Item>
				{error && (
					<Form.Item>
						<Alert message={error} type="error" />
					</Form.Item>
				)}
				<Form.Item>
					<Button type="default" htmlType="submit" className="login-form-button">
						Đăng nhập
					</Button>
					hoặc <Link href={'/logon'}>Đăng kí ngay</Link>
				</Form.Item>
			</Form>
		</div>
	);
};
function mapStateToProps(state) {
	return {
		error: state.user.error,
		username: state.user.username,
	};
}

export default Form.create({ name: 'normal_login' })(
	connect(
		mapStateToProps,
		{
			login,
		},
	)(_Form),
);
