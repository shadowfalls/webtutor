import React from 'react';
import { Col } from 'reactstrap';
import { Link } from "react-router-dom";

import * as constants from '../../core/constants';
import Utils from '../../core/Utils';

import './RecentArticles.scss';

export default class RecentArticles extends React.Component {

    utils = new Utils();

    constructor(props) {
        super(props);
    }

    render() {

        const blogs = this.props.articles.map(c => {
            return <React.Fragment key={c.blogId}>
                <Col xs="12" lg="4" md="6" sm="12" className="recent-card">
                    <div className="title">{c.title}</div>
                    <div className="details">{this.utils.printDate(c.date) + ' - ' + c.readTimeMin + ' mins read'}</div>
                    <Link to={`${constants.routeLinks.blogPage}/${c.blogId}`}>read more</Link>
                </Col>
            </React.Fragment>;
        });

        return <React.Fragment>
            {blogs}
        </React.Fragment>;
    }

}
