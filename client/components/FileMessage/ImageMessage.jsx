import React from 'react';
import './image-message.scss';
function ImageMessage({ path, originalname }) {
	return (
		<div className="gin-image-message">
			<img alt={originalname} src={'/' + path} />
		</div>
	);
}

export default ImageMessage;
