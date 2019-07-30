import React, { Component } from "react";
import ReactDisqusComments from 'react-disqus-comments';
import {
    Row, Col, Button, Container
} from 'reactstrap';
import axios from 'axios';
import Gist from 'react-gist';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdSense from 'react-adsense';

import './Blog.scss';

import RecentArticles from '../Shared/RecentArticles/RecentArticles';
import * as constants from '../core/constants';
import Utils from '../core/Utils';

export default class Blog extends Component {

    utils = new Utils();

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            categoryId: '',
            readTimeMin: 0,
            date: this.utils.getDate(),
            content: [],
            recent: [],
            shareLinks: {
                linkedIn: 'https://www.linkedin.com/shareArticle?mini=true&url=https%3A//www.dineshmg.com/&title=Learn%20Web%20development&summary=&source=',
                facebook: 'https://www.facebook.com/sharer/sharer.php?u=https%3A//www.dineshmg.com/',
                twitter: 'https://twitter.com/home?status=https%3A//www.dineshmg.com/',
            }
        };
        this.handleNewComment = this.handleNewComment.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        if (params && params.id) {
            this.id = params.id;
            if (!this.id)
                this.props.history.goBack();
            this.fetchBlog(this.id);
        }
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

    componentWillReceiveProps(nextProps) {
        const { match: { params } } = nextProps;
        if (params && params.id) {
            this.id = params.id;
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
                        description: res.data.description,
                        date: this.utils.getDate(res.data.date),
                        readTimeMin: res.data.readTimeMin,
                        categoryId: res.data.categoryId
                    });
                window.scrollTo(0, 0)
            })
            .catch(err => this.props.history.goBack());
    }

    printDate(date) {
        if (!date)
            return '';
        const month = constants.months[date.getMonth()];
        return month + ' ' + date.getDate() + ', ' + date.getFullYear();
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
            <Helmet>
                <title>{this.state.title}</title>
                <meta name="description" content={this.state.description} />
            </Helmet>
            <div className="blog-page__container">
                <Container>
                    <Row>
                        <Col xs="12">
                            <AdSense.Google
                                client='ca-pub-3929370842605036'
                                slot='3072497734'
                                format='auto'
                                responsive='true'
                            />
                        </Col>
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
                        <Col xs="12">
                            <div className="share">
                                Share:
                            </div><br></br>
                            <a target="_blank" className="mr-5" rel="noopener noreferrer" href={this.state.shareLinks.linkedIn}>
                                <FontAwesomeIcon icon={['fab', 'linkedin-in']} size="2x" /></a>&nbsp;
                            <a target="_blank" className="mr-5" rel="noopener noreferrer" href={this.state.shareLinks.facebook}>
                                <FontAwesomeIcon icon={['fab', 'facebook']} size="2x" /></a>
                            <a target="_blank" className="mr-5" rel="noopener noreferrer" href={this.state.shareLinks.twitter}>
                                <FontAwesomeIcon icon={['fab', 'twitter']} size="2x" /></a>
                        </Col>
                        <Col xs="12">
                            <hr></hr>
                        </Col>
                        <Col xs="12">
                            <div className="recent">
                                Recent Articles:
                            </div>
                        </Col>
                        <RecentArticles articles={this.state.recent} />
                        <Col xs="12">
                            <hr></hr>
                        </Col>
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
