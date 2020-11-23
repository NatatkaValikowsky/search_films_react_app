import React, {Component} from 'react';
import {Row} from "antd";
import Film from "../film";
import 'antd/dist/antd.css';
import './films-list.css';

export default class FilmsList extends Component{

    constructor(props) {
        super(props);

        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=1a312659d57cbdc19acab57a112fc99f&query=return`)
            .then(result => result.json())
            .then(data => {
                this.setState({
                    items: data.results
                });
            });
    }

    render() {
        const { items } = this.state;

        const elements = items.map(el => {
            return (
                <Film key={el.id} {...el} />
            );
        });

        return (
            <Row className="films-list">
                { elements }
            </Row>
        )
    }
}
