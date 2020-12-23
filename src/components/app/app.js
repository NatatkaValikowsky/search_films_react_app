import React, { Component } from 'react';
import {Row, Tabs} from "antd";
import ApiService from '../../services/api-service';
import FilmsList from '../films-list';import SearchBlock from "../search-block";
import ErrorMessage from "../error-message";
import { GenresProvider } from '../../genres-list-context';
import './app.css';
import Spinner from "../spinner";
import PaginationBlock from "../pagination-block";
import Empty from "../empty";

const { TabPane } = Tabs;

export default class App extends Component {
	state = {
		items: null,
		ratedItems: [],
		genreList:null,
		loaded: true,
		error: false,
		query: '',
		page: 1,
		tabNum: 1,
		isInit: false
	};

	apiService = new ApiService();

	componentDidMount = () => {
		this.initApplication();
	};

	initApplication = async () => {

		this.apiService.getGenres().then((data) => {
			this.setState({
				genreList: data.genres,
			});

			this.apiService.getSessionId().then((request) => {
				if (request) {

					this.setState({
						isInit: true,
						error: false
					});

					console.log('init');

					this.apiService
						.getRatedMovies()
						.then((items) => {
							this.setState({
								ratedItems: items.results,
								loaded: true
							});
						});
				}
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

	onStartSearching = async (queryString) => {
		if(queryString.trim() === '') return;

		const { isInit, error } = this.state;

		if (!isInit){
			await this.initApplication();
		}

		console.log('error', error);

		if(!error){
			console.log(222222);
			this.setState(() => ({
				query: queryString,
				loaded: false,
				page: 1,
				error: false
			}));

			this.getFilmsItems(1);
		}

	};

	getFilmsItems = (page) => {
		console.log('get films');
		const { query } = this.state;

		this.apiService
			.getMovies(query, page)
			.then((data) => {
				this.setState({
					items: data.results,
					loaded: true,
					totalResults: data.total_results,
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

	getPage = (page) => {
		this.setState({
			page,
			loaded: false,
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
					loaded: true,
				});
			});
		} else {
			const { page, query } = this.state;
			if(query.trim() !== ''){
				this.getFilmsItems(page);
			}
		}
	};

	rateFilm = (rateValue, filmId) => {
		this.apiService.rateMovie(rateValue, filmId).then().catch();
	};

	render() {
		const { items, ratedItems, loaded, error, errorMessage, page, tabNum, query, genreList, totalResults } = this.state;

		const searchBlock = tabNum === 1 ? <SearchBlock query={query} onStartSearch={this.onStartSearching} /> : null;
		const errorBlock = error ? <ErrorMessage message={errorMessage} /> : null;
		const spinner = !loaded ? <Spinner /> : null;
		const hasData = !(error || !loaded) && items;
		const pagination =
			hasData && items.length > 0 ? (
				<PaginationBlock hideOnSinglePage count={totalResults} currPage={page} onChange={this.getPage} />
			) : null;

		const elements = hasData ? <FilmsList type={tabNum} items={items} ratedItems={ratedItems} rateFilm={this.rateFilm} /> : null;

		return (
			<div className="wrapper">
				<GenresProvider value={genreList}>
					<Tabs className="tab-panel" defaultActiveKey={tabNum} onChange={this.changeTab}>
						<TabPane tab="Search" key="1">
							<Row className="films-list">
								{ searchBlock }
								{ errorBlock }
								{ spinner }
								{ elements }
								{ pagination }
							</Row>
						</TabPane>
						<TabPane tab="Rated" key="2">
							<Row className="films-list">
								{ errorBlock }
								{ ratedItems.length > 0 || spinner || <Empty/> }
								{ elements }
							</Row>
						</TabPane>
					</Tabs>

				</GenresProvider>
			</div>
		);
	}
}
