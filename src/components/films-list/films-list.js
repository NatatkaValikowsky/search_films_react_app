import React, { Component } from 'react';
import { Row } from 'antd';
import 'antd/dist/antd.css';
import ApiService from '../../services/api-service';
import Spinner from '../spinner';
import Film from '../film';
import ErrorMessage from '../error-message';
import './films-list.css';

export default class FilmsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			loaded: false,
			error: false,
		};
	}

	componentDidMount() {
		const apiService = new ApiService();

		apiService
			.getMovies('return')
			.then((data) => {
				this.setState({
					items: data.results,
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

	render() {
		const { items, loaded, error, errorMessage } = this.state;

		const hasData = !(error || !loaded);

		const elements = hasData ? items.map((el) => <Film key={el.id} {...el} />) : null;
		const spinner = !loaded ? <Spinner /> : null;
		const errorBlock = error ? <ErrorMessage message={errorMessage} /> : null;

		return (
			<Row className="films-list">
				{errorBlock}
				{spinner}
				{elements}
			</Row>
		);
	}
}
