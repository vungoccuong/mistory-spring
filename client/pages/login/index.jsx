import React from 'react';
import UnAuthLayout from '../../layouts/UnAuthLayout';
import Form from './Form';
import './index.scss';
function Login(props) {
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

export default Login;
