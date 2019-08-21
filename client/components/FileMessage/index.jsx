import React from 'react';
import { Icon } from 'antd';
import ImageMessage from './ImageMessage';
import Link from 'next/link';
function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
function FileMessage({ path, size, type, originalname }) {
	if (type === 'image') {
		return <ImageMessage path={path} originalname={originalname} />;
	} else {
		return (
			<div>
				<Link href={'/' + path}>
					<a target="_blank">
						<Icon type="paper-clip" />
						{originalname}
					</a>
				</Link>

				<div>{formatBytes(size)}</div>
			</div>
		);
	}
}

export default FileMessage;
