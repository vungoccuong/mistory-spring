import React, { useEffect, useState } from 'react';
import { Picker } from 'emoji-mart';
import _ from 'lodash';
import './index.scss';
import { Icon } from 'antd';

function Emoji({ addEmoji = _.noop }) {
	const [show, setShow] = useState(false);
	useEffect(() => {
		const listener = e => {
			const el = document.getElementById('gin-emoji-picker');
			const svg = document.getElementById('gin-emoji-button');
			if (el && svg && !el.contains(e.target) && !svg.contains(e.target)) {
				setShow(false);
			}
		};
		document.addEventListener('click', listener);
		return () => document.removeEventListener('click', listener);
	}, []);
	const onToggle = () => setShow(!show);
	return (
		<div>
			<div className="gin-emoji-button" onClick={onToggle}>
				<Icon type="smile" style={{ fontSize: 30, color: '#fff' }} id="gin-emoji-button" />
			</div>
			{show && (
				<div className="gin-emoji-picker" id="gin-emoji-picker">
					<Picker onSelect={addEmoji} />
				</div>
			)}
		</div>
	);
}

export default Emoji;
