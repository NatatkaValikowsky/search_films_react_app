import React from 'react';
import image from './empty.svg';
import './empty.css';

const Empty = () => {
	return (
		<div className="empty-block">
			<img src={image} alt="not found" />
			<p>Вы еще не добавили ничего в избранное</p>
		</div>
	);
};

export default Empty;
