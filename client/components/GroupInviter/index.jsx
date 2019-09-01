import React, { useEffect, useState } from 'react';
import './index.scss';
import { List, Avatar, Select, Spin } from 'antd';

const Option = Select.Option;
import Link from 'next/link';
import { request } from 'universal-rxjs-ajax';
import { map } from 'rxjs/operators';
import { useRouter } from 'next/router';

function GroupInviter({ room: { type, _id, ...st } }) {
	const [members, setMember] = useState(st.members);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setMember(st.members);
	}, [st.members]);
	// const router = useRouter();
	const onSearch = value => {
		if (!value) return;
		setLoading(true);
		request({
			url: '/spring/user/search?text=' + value,
			withCredentials: true
		})
			.pipe(map(res => res.response))
			.subscribe(data => {
				const memberIds = members.map(m => m._id);
				setData(
					data
						.filter(i => !~memberIds.indexOf(i._id))
						.map(m => ({ key: m._id, fullName: m.fullName })),
				);
				setLoading(false);
			});
	};
	const onChange = ({ key }) => {
		request({
			url: '/spring/group/invite',
			method: 'POST',
			body: {
				userId: key,
				roomId: _id,
			},
			withCredentials: true
		})
			.pipe(map(res => res.response))
			.subscribe(({ status, data }) => status === 'success' && addMember(data));
	};
	const addMember = data => {
		setMember([data, ...members]);
	};
	const onRemoveUser = userId => () =>
		request({
			url: '/v1/group/remove',
			method: 'PUT',
			body: {
				userId: userId,
				roomId: _id,
			},
		})
			.pipe(map(res => res.response))
			.subscribe(({ status, _id }) => status === 'success' && removeMember(_id));
	const removeMember = userId => {
		const r = members.filter(m => m._id !== userId);
		setMember(r);
	};
	if (type !== 'group') return <></>;
	return (
		<div className="gin-group-inviter">
			<div className="">
				<Select
					showSearch
					labelInValue
					placeholder="Thêm thành viên"
					notFoundContent={loading ? <Spin size="small" /> : null}
					filterOption={false}
					onSearch={onSearch}
					onChange={onChange}
					style={{ width: '100%' }}
				>
					{data.map(d => (
						<Option key={d.key}>{d.fullName}</Option>
					))}
				</Select>
			</div>
			<div>
				<List
					bordered
					itemLayout="horizontal"
					dataSource={members}
					renderItem={({ username, fullName, _id }) => (
						<List.Item
							actions={[
								<a key="list-loadmore-edit" onClick={onRemoveUser(_id)}>
									Xoá
								</a>,
							]}
						>
							<List.Item.Meta
								avatar={<Avatar>{fullName.substring(0, 2).toUpperCase()}</Avatar>}
								title={
									<Link href={`/chat/${username}`}>
										<a target="_blank">{username}</a>
									</Link>
								}
							/>
						</List.Item>
					)}
				/>
			</div>
		</div>
	);
}

export default GroupInviter;
