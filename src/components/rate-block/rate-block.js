import React from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';

const RateBlock = (props) => {
	const { rateValue, onChange } = props;

	return <Rate allowHalf count="10" value={rateValue} disabled={rateValue} onChange={onChange} />;
};

export default RateBlock;

RateBlock.defaultProps = {
	rateValue: null,
	onChange: () => {},
};

RateBlock.propTypes = {
	rateValue: PropTypes.number,
	onChange: PropTypes.func,
};
