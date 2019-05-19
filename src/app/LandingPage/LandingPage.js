import React from 'react';
import {
    Row, Col, Card, CardBody, Container,
    CardTitle
} from 'reactstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import * as constants from '../core/constants';

import './LandingPage.scss';

export default class LandingPage extends React.Component {

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

        return <span className="landing-page">
            {/* <div className="heading-advertise">
            </div> */}
            <div className="landing-page__container">
                <Container>
                    <Row>
                        {/* <Col className="advertise d-none d-xl-block d-lg-block d-md-block" xl="3" lg="3" md="2"></Col> */}
                        <Col>
                            <Row>
                                <Col xs="12">
                                    <div className="welcome-text">
                                        Welcome to WebTutor
                                    </div>
                                    <p className="lead">Learn web-technology the right way. We have blog articles for the following technologies</p>
                                </Col>
                                {cats}
                            </Row>
                        </Col>
                        {/* <Col className="advertise d-none d-xl-block d-lg-block d-md-block" lg="2" xl="2" md="2"></Col> */}
                    </Row>
                </Container>
            </div>
        </span>;
    }
}