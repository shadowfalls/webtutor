import React from 'react';
import {
    Row, Col, Card, CardBody, Container,
    CardTitle
} from 'reactstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import AdSense from 'react-adsense';

import RecentArticles from '../Shared/RecentArticles/RecentArticles';
import * as constants from '../core/constants';
import Utils from '../core/Utils';

import './LandingPage.scss';

export default class LandingPage extends React.Component {

    utils = new Utils();

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            recent: []
        }
    }

    componentDidMount() {
        axios.get(`${constants.baseUrl}/api/categories/${constants.categoryTypes}.json`)
            .then((res) => {
                if (res)
                    this.setState({
                        categories: res.data && res.data.length ? res.data.slice(0, 4) : []
                    });
            })
            .catch(err => {
            });
        this.utils.getRecentArticles()
            .then((res) => {
                if (res)
                    this.setState({
                        recent: res.data && res.data.length ? res.data : []
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
                        <Link to={`${constants.routeLinks.blogListPage}/${c.catName}/${c.catId}`}>see blogs</Link>
                    </CardBody>
                </Card>
            </Col>;
        });

        return <span className="landing-page">
            {/* <div className="heading-advertise">
            </div> */}
            <Helmet>
                <title>Dinesh Murali</title>
                <meta name="description" content={"Welcome to my website. We have blog articles that you can read."} />
            </Helmet>
            <div className="landing-page__container">
                <Container>
                    <Row>
                        <Col xs="12">
                            <div className="welcome-text">
                                Learn Web-technology
                            </div>
                            <p className="lead">We have blog articles for the following technologies</p>
                        </Col>
                        {cats}
                        <Col xs="12">
                            <hr></hr>
                        </Col>
                        <Col xs="12">
                        <AdSense.Google
                            client='ca-pub-3929370842605036'
                            slot='7013353577'
                            format='auto'
                            responsive='true'
                        />
                        </Col>
                        <Col xs="12">
                            <div className="recent">
                                Recent Articles:
                            </div>
                        </Col>
                        <RecentArticles articles={this.state.recent} />
                    </Row>
                </Container>
            </div>
        </span >;
    }
}