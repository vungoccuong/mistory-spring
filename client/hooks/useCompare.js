import React from 'react';
import usePrevious from './usePrevious';
export default function(value) {
	const prev = usePrevious(value);
	return prev !== value;
}
