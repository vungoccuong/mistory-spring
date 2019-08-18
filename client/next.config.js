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
					// cssModules: true,
					cssLoaderOptions: {
						importLoaders: 1,
						localIdentName: '[local]___[hash:base64:5]',
					},
					lessLoaderOptions: {
						javascriptEnabled: true,
					},
					webpack: (config, { isServer }) => {
						if (isServer) {
							const antStyles = /antd\/.*?\/style.*?/;
							const origExternals = [...config.externals];
							config.externals = [
								(context, request, callback) => {
									if (request.match(antStyles)) return callback();
									if (typeof origExternals[0] === 'function') {
										origExternals[0](context, request, callback);
									} else {
										callback();
									}
								},
								...(typeof origExternals[0] === 'function' ? [] : origExternals),
							];

							config.module.rules.unshift({
								test: antStyles,
								use: 'null-loader',
							});
						}
						return config;
					},
				}),
			),
		),
		useFileSystemPublicRoutes: true,
		poweredByHeader: false,
	};
};
