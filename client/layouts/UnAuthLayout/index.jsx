import React from 'react';
import UnAuthHeader from '../../components/UnAuthHeader';
import { Layout } from 'antd';
import Head from 'next/head';
function UnAuthLayout({ title = 'Chưa đăng nhập', children }) {
	return (
		<Layout className="main-layout">
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="defaultLanguage" content="fr" />
				<meta name="availableLanguages" content="fr, en" />
			</Head>
			<UnAuthHeader />
			{children}
		</Layout>
	);
}

export default UnAuthLayout;
