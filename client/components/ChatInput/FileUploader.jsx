import React, { useRef } from 'react';
import { Icon, message } from 'antd';
import styled from 'styled-components';
import { request } from 'universal-rxjs-ajax';
import { catchError, map } from 'rxjs/operators';
import { useRouter } from 'next/router';
import { of } from 'rxjs';
import { getStompConnection } from '../../utils/stomp';
const Container = styled.div`
	> input {
		width: 0;
		height: 0;
	}
	width: 30px;
`;

function FileUploader(props) {
	const router = useRouter();
	const roomId = router.query.roomId;
	const ref = useRef(null);
	const onChange = ({ target: { files } }) => {
		const file = files[0];
		if (!file) return null;
		const form = new FormData();
		form.append('file', file);
		request({
			url: '/spring/file/',
			method: 'post',
			body: form,
		})
			.pipe(
				map(res => res.response && res.response.id),
				catchError(err => of(err.xhr.response)),
			)
			.subscribe(id =>
				typeof id === 'string'
					? getStompConnection().sendFile(id, roomId)
					: message.error('Gặp lỗi khi tải tệp'),
			);
	};
	const onClick = () => {
		if (!ref.current) return;
		ref.current.click();
	};
	return (
		<Container>
			<Icon onClick={onClick} type="paper-clip" style={{ fontSize: 30, color: '#fff' }}/>
			<input type="file" ref={ref} onChange={onChange}/>
		</Container>
	);
}

export default FileUploader;
