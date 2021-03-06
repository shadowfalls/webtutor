import React from 'react';
import {
    Row, Col, Card, CardBody,
    CardTitle, Container
} from 'reactstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

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
        const { match: { params } } = this.props;
        if (params && params.id) {
            this.id = params.id;
            this.name = params.name;
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
            return <React.Fragment key={c.blogId}>
                <Col lg="3" md="2"></Col>
                <Col xs="11" lg="8" md="9" sm="11" className="card-margin">
                    <Card>
                        <CardBody>
                            <CardTitle>{c.blogName}</CardTitle>
                            <div className="details">{this.utils.printDate(c.date) + ' - ' + c.readTimeMin + ' mins read'}</div>
                            <Link to={`${constants.routeLinks.blogPage}/${c.blogId}`}>read more</Link>
                        </CardBody>
                    </Card>
                </Col>
            </React.Fragment>;
        });

        return <span className="blog-list">
            {/* <div className="heading-advertise">
        </div> */}
            <Helmet>
                <title>{this.state.catName}</title>
                <meta name="description" content={"List of blogs for "+this.state.catName} />
            </Helmet>
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
                                    {this.state.catName && <p className="lead">Available articles</p>}
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