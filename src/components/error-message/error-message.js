import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Space } from 'antd';
import 'antd/dist/antd.css';
import './error-message.css';

const ErrorMessage = (props) => {
	const { message } = props;

	return (
		<Space className="spinner-space" size="middle">
			<Alert message="Error" description={message} type="error" showIcon />
		</Space>
	);
};

export default ErrorMessage;

ErrorMessage.defaultProps = {
	message: 'В приложении возникла ошибка',
};

ErrorMessage.propTypes = {
	message: PropTypes.string,
};
