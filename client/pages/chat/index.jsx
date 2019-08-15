import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Link from 'next/link';

function Chat() {
	return (
		<MainLayout>
			<div className="container">
				<div className="jumbotron">
					<h1>Next.js + Express</h1>
					<p>A simple app using Spotify API</p>
					<p>
						<Link href="/search">
							<a className="btn btn-primary btn-lg" role="button">
								Use it !
							</a>
						</Link>
					</p>
				</div>
			</div>
		</MainLayout>
	);
}

export default Chat;
