import React, { Component } from 'react';
import { Tabs, Row } from 'antd';
import 'antd/dist/antd.css';
import ApiService from '../../services/api-service';
import SearchBlock from '../search-block';
import Spinner from '../spinner';
import Film from '../film';
import ErrorMessage from '../error-message';
import NotFound from '../not-found';
import PaginationBlock from '../pagination-block';
import './films-list.css';
import { GenresProvider } from '../genres-list-context';

const { TabPane } = Tabs;

export default class FilmsList extends Component {
	state = {
		items: null,
		ratedItems: null,
		loaded: true,
		error: false,
		query: '',
		page: 1,
		tabNum: 1,
	};

	apiService = new ApiService();

	componentDidMount = () => {
		this.apiService.getGenres().then((data) => {
			this.setState({
				genreList: data.genres,
			});
		});

		this.apiService.getSessionId().then((request) => {
			if (request) {
				this.apiService
					.getRatedMovies()
					.then((data) => {
						this.setState({
							ratedItems: data.results,
							loaded: true
						});
					})
					.catch((error) => {
						this.setState({
							error: true,
							errorMessage: error.message,
							loaded: true,
						});
					});
			}
		});
	};

	onStartSearching = (queryString) => {
		if (queryString !== '') {
			this.setState(() => ({
				query: queryString,
				loaded: false,
				page: 1,
			}));

			this.getFilmsItems(1);
		}
	};

	getFilmsItems = (page) => {
		const { query } = this.state;

		this.apiService
			.getMovies(query, page)
			.then((data) => {
				this.setState({
					items: data.results,
					loaded: true,
					totalResults: data.total_results
				});
			})
			.catch((error) => {
				this.setState({
					error: true,
					errorMessage: error.message,
					loaded: true,
				});
			});
	};

	getFilms = (items) => {
		if (items && items.length === 0) {
			return <NotFound />;
		}

		const { ratedItems } = this.state;
		if(ratedItems){
			const ratings = ratedItems.reduce((acc, el) => ({ ...acc, [el.id]: el.rating }), {});
			return items.map((el) => <Film onChangeRate={this.rateFilm} rating={ratings[el.id]} key={el.id} {...el} />);
		}


		return null;

	};

	getRatedFilms = (items) => {
		if (items && items.length === 0) {
			return <NotFound />;
		}

		return items.map((el) => <Film key={el.id} {...el} />);
	};

	getPage = (page) => {
		this.setState({
			page,
		});

		this.getFilmsItems(page);
	};

	changeTab = (key) => {
		this.setState({
			tabNum: parseInt(key, 10),
		});

		if (parseInt(key, 10) === 2) {
			this.setState({
				loaded: false,
			});

			this.apiService.getRatedMovies().then((data) => {
				this.setState({
					ratedItems: data.results,
					loaded: true
				});
			});
		} else {
			const { page } = this.state;
			this.getFilmsItems(page);
		}
	};

	rateFilm = (rateValue, filmId) => {
		this.apiService.rateMovie(rateValue, filmId).then().catch();
	};

	render() {
		const { items, ratedItems, loaded, error, errorMessage, page, tabNum, query, genreList, totalResults } = this.state;

		const searchBlock = tabNum === 1 ? <SearchBlock query={query} onStartSearch={this.onStartSearching} /> : null;
		const hasData = !(error || !loaded) && items;
		const elements = hasData && tabNum === 1 ? this.getFilms(items) : null;
		const rateElements = hasData && tabNum === 2 ? this.getRatedFilms(ratedItems) : null;
		const spinner = !loaded ? <Spinner /> : null;
		const errorBlock = error ? <ErrorMessage message={errorMessage} /> : null;
		const pagination = hasData && items.length > 0 ? <PaginationBlock onPage={items.length} hideOnSinglePage count={totalResults} currPage={page} onChange={this.getPage} /> : null;

		return (
			<GenresProvider value={genreList}>
				<Tabs className="tab-panel" defaultActiveKey={tabNum} onChange={this.changeTab}>
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
