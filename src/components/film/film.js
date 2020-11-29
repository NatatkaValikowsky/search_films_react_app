import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import FilmImage from '../film-image';
import FilmInfo from '../film-info';
import 'antd/dist/antd.css';
import './film.css';

export default class Film extends Component {
	constructor(props) {
		super(props);

		const { rating } = props;

		this.state = {
			rating,
		};
	}

	onChangeRate = (value) => {
		const { onChangeRate, id } = this.props;
		onChangeRate(value, id);

		this.setState({
			rating: value,
		});
	};

	render() {
		const { poster_path: posterPath, ...filmInfo } = this.props;

		const { rating } = this.state;

		return (
			<Col md={24} lg={12}>
				<article className="film-block">
					<FilmImage imageUrl={posterPath} />
					<FilmInfo {...filmInfo} onChangeRate={this.onChangeRate} rating={rating} />
				</article>
			</Col>
		);
	}
}

Film.defaultProps = {
	poster_path: '',
	onChangeRate: () => {},
	rating: null,
};

Film.propTypes = {
	poster_path: PropTypes.string,
	onChangeRate: PropTypes.func,
	id: PropTypes.number.isRequired,
	rating: PropTypes.number,
};
