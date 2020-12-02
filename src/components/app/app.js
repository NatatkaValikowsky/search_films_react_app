import React, { Component } from 'react';
import ApiService from '../../services/api-service';
import FilmsList from '../films-list';
import './app.css';

export default class App extends Component {
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
							loaded: true,
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
		if (queryString.trim() !== '') {
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
			const { page } = this.state;
			this.getFilmsItems(page);
		}
	};

	rateFilm = (rateValue, filmId) => {
		this.apiService.rateMovie(rateValue, filmId).then().catch();
	};

	render() {
		const { items, ratedItems, loaded, error, errorMessage, page, tabNum, query, genreList, totalResults } = this.state;

		return (
			<div className="wrapper">
				<FilmsList
					items={items}
					ratedItems={ratedItems}
					loaded={loaded}
					error={error}
					errorMessage={errorMessage}
					page={page}
					tabNum={tabNum}
					query={query}
					genreList={genreList}
					totalResults={totalResults}
					onStartSearching={this.onStartSearching}
					getPage={this.getPage}
					changeTab={this.changeTab}
					rateFilm={this.rateFilm}
				/>
			</div>
		);
	}
}
