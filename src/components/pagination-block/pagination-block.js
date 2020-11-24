import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import './pagination-block.css';

const PaginationBlock = (props) => {
	const { pages, onChange, currPage } = props;

	return (
		<Pagination
			className="pagination-block"
			current={currPage}
			total={pages}
			onChange={onChange}
			showSizeChanger={false}
		/>
	);
};

export default PaginationBlock;

PaginationBlock.defaultProps = {
	onChange: () => {},
};

PaginationBlock.propTypes = {
	pages: PropTypes.number.isRequired,
	currPage: PropTypes.number.isRequired,
	onChange: PropTypes.func,
};
