import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Film from '../film';
import NotFound from '../not-found';
import './films-list.css';

export default class FilmsList extends Component {
	getFilms = (items) => {
		if (items && items.length === 0) {
			return <NotFound />;
		}

		const { ratedItems, rateFilm } = this.props;

		if (ratedItems) {
			const ratings = ratedItems.reduce((acc, el) => ({ ...acc, [el.id]: el.rating }), {});
			return items.map((el) => <Film onChangeRate={rateFilm} rating={ratings[el.id]} key={el.id} {...el} />);
		}

		return null;
	};

	getRatedFilms = (items) => items.map((el) => <Film key={el.id} {...el} />);

	render() {
		const { items, ratedItems, type } = this.props;

		return <>{type === 'search' ? this.getFilms(items) : this.getRatedFilms(ratedItems)}</>;
	}
}

FilmsList.defaultProps = {
	items: [],
	ratedItems: [],
	rateFilm: () => {},
	type: 'search',
};

FilmsList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
	ratedItems: PropTypes.arrayOf(PropTypes.object),
	rateFilm: PropTypes.func,
	type: PropTypes.string,
};
