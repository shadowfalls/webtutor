import React from 'react';
import {
    Row, Col, Card, CardBody,
    CardTitle, Container
} from 'reactstrap';
import axios from 'axios';
import { Link } from "react-router-dom";

import * as constants from '../core/constants';
import Utils from '../core/Utils';

import './BlogList.scss';

export default class BlogList extends React.Component {

    utils = new Utils();

    constructor(props) {
        super(props);
        this.state = {
            blogs: []
        };
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        if (params && params.get && params.get('id')) {
            this.id = params.get('id');
            this.name = params.get('name');
            if (!this.id)
                this.props.history.goBack();
            this.fetchBlogs(this.id);
        }
    }

    fetchBlogs(id) {
        if (!id)
            return;
        axios.get(`${constants.baseUrl}/api/categories/${id}.json`)
            .then(res => {
                if (res)
                this.setState({
                    catName: this.name,
                    blogs: res.data && res.data.length ? res.data : []
                });
            })
            .catch(err => this.props.history.goBack());
    }

    render() {

        const blogs = this.state.blogs.map(c => {
            return <Col xs="11" lg="11" md="11" sm="11" className="card-margin" key={c.blogId}>
                <Card>
                    <CardBody>
                        <CardTitle>{c.blogName}</CardTitle>
                        <div className="details">{this.utils.printDate(c.date)+' - '+c.readTimeMin+' mins read'}</div>
                        <Link to={{ pathname: constants.routeLinks.blogPage, search: `?id=${c.blogId}` }}>read more</Link>
                    </CardBody>
                </Card>
            </Col>;
        });

        return <span className="blog-list">
            {/* <div className="heading-advertise">
        </div> */}
            <div className="blog-list__container">
            <Container>
                <Row>
                    {/* <Col className="advertise d-none d-xl-block d-lg-block d-md-block" xs="3" md="2"></Col> */}
                    <Col>
                        <Row>
                            <Col xs="12">
                                <div className="heading-text">
                                    {this.state.catName}
                                </div>
                                {this.state.catName && <p className="lead">Availabel articles</p>}
                            </Col>
                            {blogs}
                        </Row>
                    </Col>
                    {/* <Col className="advertise d-none d-xl-block d-lg-block d-md-block" xs="3" md="2"></Col> */}
                </Row>
            </Container>
            </div>
        </span>;
    }
}