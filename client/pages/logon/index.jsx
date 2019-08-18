import React from 'react';
import UnAuthLayout from '../../layouts/UnAuthLayout';
import Form from './Form';
import './index.scss';
function Index(props) {
	return (
		<UnAuthLayout>
			<div className="gin-logon-page">
				<div>
					<Form />
				</div>
			</div>
		</UnAuthLayout>
	);
}

export default Index;
