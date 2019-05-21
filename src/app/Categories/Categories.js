import React from 'react';
import {
    Row, Col, Card, CardBody,
    CardTitle, Container
} from 'reactstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import * as constants from '../core/constants';

import './Categories.scss';

export default class Categories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios.get(`${constants.baseUrl}/api/categories/_categorieTypes.json`)
            .then((res) => {
                if (res)
                    this.setState({
                        categories: res.data && res.data.length ? res.data.slice(0, 4) : []
                    });
            })
            .catch(err => {
            });
    }

    render() {

        const cats = this.state.categories.map(c => {
            return <Col xs="11" lg="5" md="5" sm="11" className="card-margin" key={c.catId}>
                <Card>
                    <CardBody>
                        <CardTitle>{c.catName}</CardTitle>
                        <Link to={{ pathname: constants.routeLinks.blogListPage, search: `?id=${c.catId}&name=${c.catName}` }}>more</Link>
                    </CardBody>
                </Card>
            </Col>;
        });

        return <span className="categories-page">
            {/* <div className="heading-advertise">
            </div> */}
            <div className="categories-page__container">
                <Container>
                    <Row>
                        {/* <Col className="advertise d-none d-xl-block d-lg-block d-md-block" xs="3" md="2"></Col> */}
                        <Col>
                            <Row>
                                <Col xs="12">
                                    <div className="heading-text">
                                        Topics
                                </div>
                                    <p className="lead">These are the available topics/categories of blogs that we have so far</p>
                                </Col>
                                {cats}
                            </Row>
                        </Col>
                        {/* <Col className="advertise d-none d-xl-block d-lg-block d-md-block" xs="3" md="2"></Col> */}
                    </Row>
                </Container>
            </div>
        </span>;
    }
}
