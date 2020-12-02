import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Row } from 'antd';
import 'antd/dist/antd.css';
import SearchBlock from '../search-block';
import Spinner from '../spinner';
import Film from '../film';
import ErrorMessage from '../error-message';
import NotFound from '../not-found';
import PaginationBlock from '../pagination-block';
import './films-list.css';
import { GenresProvider } from '../../genres-list-context';

const { TabPane } = Tabs;

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

	getRatedFilms = (items) => {
		if (items && items.length === 0) {
			return <NotFound />;
		}

		return items.map((el) => <Film key={el.id} {...el} />);
	};

	render() {
		const {
			items,
			ratedItems,
			loaded,
			error,
			errorMessage,
			page,
			tabNum,
			query,
			genreList,
			totalResults,
			onStartSearching,
			getPage,
			changeTab,
		} = this.props;

		const searchBlock = tabNum === 1 ? <SearchBlock query={query} onStartSearch={onStartSearching} /> : null;
		const hasData = !(error || !loaded) && items;
		const elements = hasData && tabNum === 1 ? this.getFilms(items) : null;
		const rateElements = hasData && tabNum === 2 ? this.getRatedFilms(ratedItems) : null;
		const spinner = !loaded ? <Spinner /> : null;
		const errorBlock = error ? <ErrorMessage message={errorMessage} /> : null;
		const pagination =
			hasData && items.length > 0 ? (
				<PaginationBlock hideOnSinglePage count={totalResults} currPage={page} onChange={getPage} />
			) : null;

		return (
			<GenresProvider value={genreList}>
				<Tabs className="tab-panel" defaultActiveKey={tabNum} onChange={changeTab}>
					<TabPane tab="Search" key="1">
						<Row className="films-list">
							{searchBlock}
							{errorBlock}
							{spinner}
							{elements}
							{pagination}
						</Row>
					</TabPane>
					<TabPane tab="Rated" key="2">
						<Row className="films-list">
							{errorBlock}
							{spinner}
							{rateElements}
						</Row>
					</TabPane>
				</Tabs>
			</GenresProvider>
		);
	}
}

FilmsList.defaultProps = {
	items: [],
	ratedItems: [],
	errorMessage: '',
	query: '',
	genreList: [],
	totalResults: 0,
	onStartSearching: () => {},
	getPage: () => {},
	changeTab: () => {},
	rateFilm: () => {},
};

FilmsList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
	ratedItems: PropTypes.arrayOf(PropTypes.object),
	loaded: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string,
	page: PropTypes.number.isRequired,
	tabNum: PropTypes.number.isRequired,
	query: PropTypes.string,
	genreList: PropTypes.arrayOf(PropTypes.object),
	totalResults: PropTypes.number,
	onStartSearching: PropTypes.func,
	getPage: PropTypes.func,
	changeTab: PropTypes.func,
	rateFilm: PropTypes.func,
};
