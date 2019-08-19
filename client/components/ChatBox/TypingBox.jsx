import React, { useMemo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
const Box = styled.div`
	position: relative;
`;
const AbsoluteBox = styled.div`
	position: absolute;
	display: flex;
	top: -60px;
	width: 200px;
`;
const TextBox = styled.p`
	font-weight: 600;
	font-size: 12px;
`;
export default connect(state => ({ isTypings: state.room.isTypings }))(function({ isTypings }) {
	const text = useMemo(() => {
		const arr = Array.from(isTypings);
		if (!arr.length) return '';
		const threeFirst = arr.slice(0, 2).join(' ');
		let exTxt = '';
		if (arr.length > 3) {
			exTxt = `và ${arr.length - 3} nguời khác`;
		}
		return `${threeFirst} ${exTxt} đang gõ...`;
	}, [isTypings]);
	return (
		<Box>
			<AbsoluteBox>
				<TextBox>{text}</TextBox>
			</AbsoluteBox>
		</Box>
	);
});
