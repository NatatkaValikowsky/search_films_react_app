import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import FilmImage from '../film-image';
import FilmInfo from '../film-info';
import 'antd/dist/antd.css';
import './film.css';

const Film = (props) => {
	const { poster_path: posterPath, ...filmInfo } = props;

	return (
		<Col sm={24} md={12}>
			<article className="film-block">
				<FilmImage imageUrl={posterPath} />
				<FilmInfo {...filmInfo} />
			</article>
		</Col>
	);
};

export default Film;

Film.defaultProps = {
	poster_path: '',
};

Film.propTypes = {
	poster_path: PropTypes.string,
};
