import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './genres-list.css';

export default class GenresList extends Component {
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
		const { genreList, genreIds } = this.props;

		const elements = this.getElements(genreList, genreIds);

		return <ul className="film-block__list">{elements}</ul>;
	}
}

GenresList.defaultProps = {
	genreList: {},
	genreIds: [],
};

GenresList.propTypes = {
	genreList: PropTypes.arrayOf(PropTypes.object),
	genreIds: PropTypes.arrayOf(PropTypes.number),
};
