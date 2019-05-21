import React, { Component } from "react";
import ReactDisqusComments from 'react-disqus-comments';
import {
    Row, Col, Button, Container
} from 'reactstrap';
import axios from 'axios';
import Gist from 'react-gist';

import './Blog.scss';

import * as constants from '../core/constants';
import Utils from '../core/Utils';

export default class Blog extends Component {

    utils = new Utils();

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            categoryId: '',
            readTimeMin: 0,
            date: this.utils.getDate(),
            content: []
        };
        this.handleNewComment = this.handleNewComment.bind(this);
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        if (params && params.get && params.get('id')) {
            this.id = params.get('id');
            if (!this.id)
                this.props.history.goBack();
            this.fetchBlog(this.id);
        }
    }

    fetchBlog(id) {
        if (!id)
            return;
        axios.get(`${constants.baseUrl}/api/articles/${id}.json`)
            .then(res => {
                if (res)
                    this.setState({
                        content: res.data.content && res.data.content.length ? res.data.content : [],
                        title: res.data.title,
                        date: this.utils.getDate(res.data.date),
                        readTimeMin: res.data.readTimeMin,
                        categoryId: res.data.categoryId
                    });
            })
            .catch(err => this.props.history.goBack());
    }

    printDate(date) {
        if (!date)
            return '';
        const month = constants.months[date.getMonth()];
        return month + ' ' + date.getDate()+', '+date.getFullYear();
    }

    handleNewComment(event) {

    }

    render() {
        const blog = this.state.content.map((line, index) => {
            if (line.isGist && line.gist)
                return <Gist key={index} className="mt-3 mb-3" id={line.gist} />;

            if (line.isMainHeading)
                return <div className="main-heading" key={index} dangerouslySetInnerHTML={{ __html: line.html }}></div>;

            if (line.isSubHeading)
                return <div className="sub-heading" key={index} dangerouslySetInnerHTML={{ __html: line.html }}></div>;

            if (line.isCodeSection)
                return <div className="code-section" key={index} dangerouslySetInnerHTML={{ __html: line.html }}></div>;

            if (line.isQuoted)
                return <div className="quote" key={index} dangerouslySetInnerHTML={{ __html: line.html }}></div>;

            return <div key={index} dangerouslySetInnerHTML={{ __html: line.html }}></div>;
        });
        return <span className="blog-page">
            {/* <div className="heading-advertise">
                </div> */}
            <div className="blog-page__container">
                <Container>
                    <Row>
                        {/* <Col className="advertise d-none d-xl-block d-lg-block d-md-block" xs="3" md="2"></Col> */}
                        <Col xs="12">
                            <div className="heading-text">
                                {this.state.title}
                            </div>
                            <p className="lead">
                                {this.printDate(this.state.date)}
                                &nbsp;-&nbsp;{this.state.readTimeMin} mins read
                                </p>
                        </Col>
                        <Col xs="12" className="contents">
                            {blog}
                        </Col>
                        {/* <Col className="advertise d-none d-xl-block d-lg-block d-md-block" xs="3" md="2"></Col> */}
                    </Row>
                    <Row>
                        <Col>
                            <ReactDisqusComments
                                shortname="shadowfalls-github-io-webtutor-1"
                                identifier={this.state.title + '123'}
                                title={this.state.title}
                                onNewComment={this.handleNewComment} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </span>;
    }
}
