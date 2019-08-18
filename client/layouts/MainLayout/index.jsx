import React, { useEffect } from 'react';
import Head from 'next/head';
import './index.scss';
import Header from '../../components/Header';
import { Layout } from 'antd';

function MainLayout({ children, title = 'Chat/ Skpi' }) {

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
			<Header />
			{children}
		</Layout>
	);
}

export default MainLayout;
