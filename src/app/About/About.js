import React from 'react';
import {
    Row, Col, Card, CardBody, Container,
    CardTitle
} from 'reactstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './About.scss';

import * as constants from '../core/constants';

export default class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'About',
            description: `I am Dinesh. I am enthusiastic software engineer who loves coding. I am open for freelancing
            work related to JavaScript. I like travelling to new places. I love learning new things.
            `,
            linkedIn: 'https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile',
            github: 'https://github.com/shadowfalls'
        };
    }

    render() {

        return <span className="about-page">
            {/* <div className="heading-advertise">
            </div> */}
            <Helmet>
                <title>{this.state.title}</title>
                <meta name="description" content={this.state.description} />
            </Helmet>
            <div className="about-page__container">
                <Container>
                    <Row>
                        <Col xs="12">
                            <div className="heading-text">
                                {this.state.title}
                            </div>
                        </Col>
                        <Col xs="12" className="contents">
                            <hr></hr>
                            {this.state.description}
                        </Col>
                        <Col xs="12" className="mb-3">
                            <hr></hr>
                            Follow me at:
                        </Col>
                        <Col xs="12">
                            <a target="_blank" className="mr-5" rel="noopener noreferrer" href={this.state.linkedIn}>
                                <FontAwesomeIcon icon={['fab', 'linkedin-in']} size="2x" /></a>&nbsp;
                            <a target="_blank" rel="noopener noreferrer" href={this.state.github}>
                                <FontAwesomeIcon icon={['fab', 'github']} size="2x" /></a>
                        </Col>
                    </Row>
                </Container>
            </div>
        </span>
    }
}
