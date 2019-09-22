import React from 'react';
import UnAuthLayout from '../../layouts/UnAuthLayout';
import Form from './Form';
import './index.scss';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
function Login({ user }) {
	const router = useRouter();
	if (user && user.username) {
		router.replace('/');
	}
	return (
		<UnAuthLayout>
			<div className="gin-login-page">
				<div>
					<Form />
				</div>
			</div>
		</UnAuthLayout>
	);
}

export default connect(state => ({ user: state.user }))(Login);
