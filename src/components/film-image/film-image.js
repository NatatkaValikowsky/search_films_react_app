import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import 'antd/dist/antd.css';
import './film-image.css';
import defaultImage from './defaultImage.jpg';

const FilmImage = (props) => {
	const url = 'http://image.tmdb.org/t/p/w600_and_h900_bestv2';
	const { imageUrl } = props;
	if (imageUrl === null) {
		return <Image className="film-block__image" width={183} src={defaultImage} />;
	}

	return <Image className="film-block__image" width={183} src={url + imageUrl} />;
};

export default FilmImage;

FilmImage.defaultProps = {
	imageUrl: null,
};

FilmImage.propTypes = {
	imageUrl: PropTypes.string,
};
