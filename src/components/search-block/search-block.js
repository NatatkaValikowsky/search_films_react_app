import React, { Component } from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import './search-block.css';

export default class SearchBlock extends Component {
	state = {
		inputText: '',
	};

	startSearch = debounce(() => {
		const { onStartSearch } = this.props;
		const { inputText } = this.state;

		onStartSearch(inputText);
	}, 1000);

	onChange = (event) => {
		this.setState(() => ({
			inputText: event.target.value
		}));

		this.startSearch();
	};

	render() {
		const { inputText } = this.state;

		const { query } = this.props;

		return (
			<Input
				className="search-block"
				onChange={this.onChange}
				placeholder="Type to search..."
				value={inputText || query}
			/>
		);
	}
}

SearchBlock.defaultProps = {
	onStartSearch: () => {},
};

SearchBlock.propTypes = {
	onStartSearch: PropTypes.func,
	query: PropTypes.string.isRequired,
};
