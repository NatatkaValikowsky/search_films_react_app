import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import './film-info.css';

export default class FilmInfo extends Component {
	textLength = 110;

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

	render() {
		const { title, overview, release_date: releaseDate } = this.props;

		return (
			<div className="film-block__info">
				<h3 className="film-block__title">{title}</h3>
				<span className="film-block__date">{format(new Date(releaseDate), 'MMMM dd, yyyy')}</span>
				<ul className="film-block__list">
					<li className="film-block__list-item">Action</li>
					<li className="film-block__list-item">Drama</li>
				</ul>
				<p>{this.getCutText(overview)}</p>
			</div>
		);
	}
}

FilmInfo.propTypes = {
	title: PropTypes.string.isRequired,
	overview: PropTypes.string.isRequired,
	release_date: PropTypes.string.isRequired,
};
