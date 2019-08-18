const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
module.exports = () => {
	/* eslint-disable */
	const withLess = require('@zeit/next-less');
	if (typeof require !== 'undefined') {
		require.extensions['.less'] = file => {};
	}
	return {
		...withCSS(
			withSass(
				withLess({
					lessLoaderOptions: {
						javascriptEnabled: true,
					},
				}),
			),
		),
		useFileSystemPublicRoutes: false,
	};
};
