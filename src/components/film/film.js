import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Rate, Image } from 'antd';
import { format } from 'date-fns';
import getCutText from "../../utils";
import 'antd/dist/antd.css';
import './film.css';
import { GenresConsumer } from '../../genres-list-context';
import defaultImage from './defaultImage.jpg';

export default class Film extends Component {
	textLength = 75;

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

	getDate = (dateString) => {
		try {
			return format(new Date(dateString), 'MMMM dd, yyyy');
		} catch (error) {
			return 'Дата неизвестна';
		}
	};

	setRatingClass = (value) => {
		if (value < 3) return 'film-block__rating--bad';
		if (value < 5) return 'film-block__rating--normal';
		if (value < 7) return 'film-block__rating--better';
		return 'film-block__rating--best';
	};

	getElements = (genreList, genreIds) => {
		return genreList
			.filter((el) => genreIds.includes(el.id))
			.map((el) => (
				<li key={el.id} className="film-block__list-item">
					{el.name}
				</li>
			));
	};

	render() {
		const {
			poster_path: posterPath,
			vote_average: voteAverage,
			overview,
			title,
			release_date: releaseDate,
			genre_ids: genreIds,
			rating: propRating
		} = this.props;

		const { rating } = this.state;

		const ratingClasses = `film-block__rating ${this.setRatingClass(voteAverage)}`;

		const url = 'http://image.tmdb.org/t/p/w600_and_h900_bestv2';
		const image = posterPath ? (
			<Image className="film-block__image" width={183} src={url + posterPath} />
		) : (
			<Image className="film-block__image" width={183} src={defaultImage} />
		);

		return (
			<Col md={24} lg={12}>
				<article className="film-block">
					{image}
					<div className="film-block__info">
						<span className={ratingClasses}>{voteAverage}</span>
						<h3 className="film-block__title">{title}</h3>
						<span className="film-block__date">{this.getDate(releaseDate)}</span>
						<GenresConsumer>
							{(genreList) => {
								const elements = this.getElements(genreList, genreIds);
								return <ul className="film-block__list">{elements}</ul>;
							}}
						</GenresConsumer>
						<p>{getCutText(overview, this.textLength)}</p>
						<Rate allowHalf count="10" value={propRating || rating} disabled={rating} onChange={this.onChangeRate} />
					</div>
				</article>
			</Col>
		);
	}
}

Film.defaultProps = {
	poster_path: '',
	onChangeRate: () => {},
	rating: null,
	vote_average: 0,
	overview: '',
	title: '',
	release_date: '',
	genre_ids: [],
};

Film.propTypes = {
	poster_path: PropTypes.string,
	onChangeRate: PropTypes.func,
	id: PropTypes.number.isRequired,
	rating: PropTypes.number,
	vote_average: PropTypes.number,
	overview: PropTypes.string,
	title: PropTypes.string,
	release_date: PropTypes.string,
	genre_ids: PropTypes.arrayOf(PropTypes.number),
};
