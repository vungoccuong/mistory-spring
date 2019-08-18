import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import './index.scss';
const FlexCenterIcon = styled(({ className }) => (
	<div className={className}>
		<Icon type="loading" />
	</div>
))`
	display: flex;
	font-size: 50px;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
function Loading() {
	return (
		<div className="gin-loading-spinner">
			<FlexCenterIcon />
		</div>
	);
}

export default Loading;
