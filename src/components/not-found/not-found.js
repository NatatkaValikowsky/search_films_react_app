import React from 'react';
import image from './not_found_icon.svg';
import './not-found.css';

const NotFound = () => {
	return (
		<div className="not-found-block">
			<img src={image} alt="not found" />
			<p>По вашему запросу ничего не найдено</p>
		</div>
	);
};

export default NotFound;
