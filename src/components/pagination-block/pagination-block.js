import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import './pagination-block.css';

const PaginationBlock = (props) => {
	const { onChange, currPage, count } = props;

	return (
		<Pagination
			className="pagination-block"
			defaultCurrent={currPage}
			total={count}
			onChange={onChange}
			showSizeChanger={false}
			pageSize={20}
		/>
	);
};

export default PaginationBlock;

PaginationBlock.defaultProps = {
	onChange: () => {},
};

PaginationBlock.propTypes = {
	currPage: PropTypes.number.isRequired,
	onChange: PropTypes.func,
	count: PropTypes.number.isRequired,
};
