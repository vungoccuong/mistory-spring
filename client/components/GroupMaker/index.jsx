import React, { useCallback, useMemo } from 'react';
import { Button, message, Modal } from 'antd';
import { request } from 'universal-rxjs-ajax';
import './index.scss';
import { catchError, map } from 'rxjs/operators';
import { useRouter } from 'next/router';
import { of } from 'rxjs';
const { confirm } = Modal;
function GroupMaker(props) {
	const router = useRouter();
	const createGroup = useCallback(
		() =>
			request({
				url: '/v1/group',
				method: 'POST',
			}).pipe(
				map(res => ({ status: 'success', data: res.response })),
				catchError(err => of({ status: 'error', data: err.xhr.response })),
			),
		[],
	);
	const onClick = useCallback(() => {
		confirm({
			title: 'Bạn chắc chắn muốn tạo nhóm chat',
			onOk() {
				createGroup().subscribe(({ status, data }) => {
					if (status === 'success') {
						router.push(`/chat/${data}`);
					} else {
						message.error('Tạo phòng gặp lỗi');
					}
				});
			},
		});
	}, []);
	return (
		<div className="gin-group-maker">
			<Button onClick={onClick}>Tạo phòng </Button>
		</div>
	);
}

export default GroupMaker;
