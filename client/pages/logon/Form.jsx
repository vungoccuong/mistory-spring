import React, { Component, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Alert, Button, Form, Icon, Input } from 'antd';
import Link from 'next/link';
import './form.scss';
import { request } from 'universal-rxjs-ajax';
import { catchError, concatMap, last, mapTo } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { useRouter } from 'next/router';
const _Form = ({ form }) => {
	const [psw, setPassword] = useState(null);
	const [error, setError] = useState(null);
	const $subject = useMemo(() => new Subject(), []);
	const getFieldDecorator = form.getFieldDecorator;
	const router = useRouter();
	const subscription = useMemo(
		() =>
			$subject.pipe(
				concatMap(body =>
					request({
						url: '/v1/user/logon',
						method: 'POST',
						body,
					})
						.pipe(
							mapTo(false),
							catchError(e => {
								const res = e.xhr.response;
								return of(res && res.message);
							}),
						)
						.pipe(last()),
				),
			),
		[$subject],
	);
	useEffect(() => {
		subscription &&
			subscription.subscribe(e => {
				if (!e) {
					router.push('/login');
				} else {
					setError(e);
				}
			});
		return () => subscription && subscription.unsubscribe();
	}, [subscription]);
	const handleSubmit = e => {
		e.preventDefault();
		form.validateFields((err, values) => {
			if (!err) {
				$subject.next(values);
			}
		});
	};
	return (
		<div className="gin-logon-form">
			<Form onSubmit={handleSubmit} className="login-form">
				<Form.Item>
					{getFieldDecorator('fullName', {
						rules: [{ required: true, message: 'Vui lòng họ và tên' }],
					})(
						<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Tên đầy đủ"
						/>,
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('username', {
						rules: [{ required: true, message: 'Vui lòng nhập tên tài khoản' }],
					})(
						<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Tên tài khoản"
						/>,
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Vui lòng nhập mật khẩu' }],
					})(
						<Input
							onChange={vl => setPassword(vl.target.value)}
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							placeholder="Mật khẩu"
						/>,
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('re-password', {
						rules: [
							{ required: true, message: 'Vui lòng nhập lại mật khẩu' },
							{
								validator: (rule, value, cb) => {
									if (value === psw) {
										cb();
									} else {
										cb('Mật khẩu nhập lại không trùng khớp');
									}
								},
							},
						],
					})(
						<Input
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							placeholder="Nhập lại mật khẩu"
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
						Đăng kí
					</Button>
					hoặc{' '}
					<Link href="/login">
						<a>Đăng nhập ngay</a>
					</Link>
				</Form.Item>
			</Form>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		error: state.user.error,
	};
}

export default Form.create({ name: 'normal_logon' })(
	connect(
		mapStateToProps,
		{},
	)(_Form),
);
