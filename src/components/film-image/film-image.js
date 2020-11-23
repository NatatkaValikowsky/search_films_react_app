import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import 'antd/dist/antd.css';
import './film-image.css'

const FilmImage = (props) => {

    const url = 'http://image.tmdb.org/t/p/w600_and_h900_bestv2';

    const { imageUrl } = props;

    return (
        <Image
            className="film-block__image"
            width={183}
            src={url + imageUrl}
        />
    );
};

export default FilmImage;

FilmImage.propTypes = {
    imageUrl: PropTypes.string.isRequired
};
