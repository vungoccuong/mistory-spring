import React from 'react';
import Head from 'next/head';
import './index.scss';
import { connection } from '../../utils/websocket';

function MainLayout({ children, title = 'Chat/ Skpi' }) {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="defaultLanguage" content="fr" />
				<meta name="availableLanguages" content="fr, en" />
			</Head>

			{children}
		</div>
	);
}

export default MainLayout;
