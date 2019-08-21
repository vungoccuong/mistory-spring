import React, { useState } from 'react';
import './index.scss';
import { List, Avatar, Select, Spin } from 'antd';

const Option = Select.Option;
import Link from 'next/link';
import { request } from 'universal-rxjs-ajax';
import { map } from 'rxjs/operators';
import { useRouter } from 'next/router';

function GroupInviter({ room: { type, members, _id } }) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const onSearch = value => {
		if (!value) return;
		setLoading(true);
		request({
			url: '/v1/user/search?text=' + value,
		})
			.pipe(map(res => res.response))
			.subscribe(
				data =>
					setData(data.map(m => ({ key: m._id, fullName: m.fullName }))) &&
					setLoading(false),
			);
	};
	const onChange = ({ key }) => {
		request({
			url: '/v1/group/invite',
			method: 'POST',
			body: {
				userId: key,
				roomId: _id,
			},
		})
			.pipe(map(res => res.response))
			.subscribe(() => router.reload());
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
						<List.Item>
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
