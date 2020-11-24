import React, { Component } from 'react';
import { Row } from 'antd';
import 'antd/dist/antd.css';
import ApiService from '../../services/api-service';
import SearchBlock from '../search-block';
import Spinner from '../spinner';
import Film from '../film';
import ErrorMessage from '../error-message';
import NotFound from '../not-found';
import PaginationBlock from '../pagination-block';
import './films-list.css';

export default class FilmsList extends Component {
	state = {
		items: null,
		loaded: true,
		error: false,
		query: '',
		page: 1,
	};

	apiService = new ApiService();

	componentDidUpdate(prevState) {
		const { query: prevQuery } = prevState;
		const { query, page } = this.state;
		if (query !== prevQuery && query !== '') {
			this.apiService
				.getMovies(query, page)
				.then((data) => {
					this.setState({
						items: data.results,
						loaded: true,
						totalPages: data.total_pages,
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
	}

	onStartSearching = (queryString) => {
		if (queryString !== '') {
			this.setState({
				query: queryString,
				loaded: false,
				page: 1,
			});
		}
	};

	getFilms = (items) => {
		if (items && items.length === 0) {
			return <NotFound />;
		}

		return items.map((el) => <Film key={el.id} {...el} />);
	};

	getPage = (page) => {
		this.setState({
			page,
		});
	};

	render() {
		const { items, loaded, error, errorMessage, totalPages, page } = this.state;

		const hasData = !(error || !loaded) && items;

		const elements = hasData ? this.getFilms(items) : null;
		const spinner = !loaded ? <Spinner /> : null;
		const errorBlock = error ? <ErrorMessage message={errorMessage} /> : null;
		const pagination = hasData ? <PaginationBlock pages={totalPages} currPage={page} onChange={this.getPage} /> : null;

		return (
			<Row className="films-list">
				<SearchBlock onStartSearch={this.onStartSearching} />
				{errorBlock}
				{spinner}
				{elements}
				{pagination}
			</Row>
		);
	}
}
