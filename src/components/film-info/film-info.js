import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import RateBlock from '../rate-block';
import GenresList from '../genres-list';
import { GenresConsumer } from '../genres-list-context';
import './film-info.css';

export default class FilmInfo extends Component {
	textLength = 75;

	getCutText(text) {
		if (text.length <= this.textLength) return text;

		if (text[this.textLength - 1] === ' ') {
			return `${text.slice(0, this.textLength - 1)} ...`;
		}

		let finishSymbol = this.textLength - 1;
		while (text[finishSymbol] !== ' ') {
			finishSymbol -= 1;
		}

		return `${text.slice(0, finishSymbol)} ...`;
	}

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

	render() {
		const {
			title,
			overview,
			release_date: releaseDate,
			onChangeRate,
			rating,
			vote_average: voteAverage,
			genre_ids: genreIds,
		} = this.props;

		const ratingClasses = `film-block__rating ${this.setRatingClass(voteAverage)}`;

		return (
			<div className="film-block__info">
				<span className={ratingClasses}>{voteAverage}</span>
				<h3 className="film-block__title">{title}</h3>
				<span className="film-block__date">{this.getDate(releaseDate)}</span>
				<GenresConsumer>
					{(genreList) => {
						return <GenresList genreList={genreList} genreIds={genreIds} />;
					}}
				</GenresConsumer>
				<p>{this.getCutText(overview)}</p>
				<RateBlock rateValue={rating} onChange={onChangeRate} />
			</div>
		);
	}
}

FilmInfo.defaultProps = {
	release_date: '',
	title: '',
	overview: '',
	onChangeRate: () => {},
	rating: 0,
	vote_average: 0,
	genre_ids: [],
};

FilmInfo.propTypes = {
	title: PropTypes.string,
	overview: PropTypes.string,
	release_date: PropTypes.string,
	onChangeRate: PropTypes.func,
	rating: PropTypes.number,
	vote_average: PropTypes.number,
	genre_ids: PropTypes.arrayOf(PropTypes.number),
};
