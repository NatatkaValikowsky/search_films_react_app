import React from 'react';
import { Spin, Space } from 'antd';
import 'antd/dist/antd.css';
import './spinner.css';

const Spinner = () => {
	return (
		<Space className="spinner-space" size="middle">
			<Spin size="large" />
		</Space>
	);
};

export default Spinner;
