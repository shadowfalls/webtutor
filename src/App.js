import React, { Component } from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faLinkedinIn, faGithub, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

library.add([faLinkedinIn, faGithub, faTwitter, faFacebook]);

import LandingPage from './app/LandingPage/LandingPage';
import BlogList from './app/BlogList/BlogList';
import Categories from './app/Categories/Categories';
import Blog from './app/Blog/Blog';
import About from './app/About/About';
import * as constants from './app/core/constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <HashRouter>
      <span className="root">
        <Navbar className="desktop-nav" color="light" light expand="md">
          <Link className="navbar-brand" to={{ pathname: '/' }}>Dinesh Murali</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to={{ pathname: constants.routeLinks.categories }}>Topics</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to={{ pathname: constants.routeLinks.about }}>About</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="cover-image">
        </div>
        <Switch>
          <Route exact path='/topics' component={Categories} />
          <Route exact path='/blogs/:name/:id' component={BlogList} />
          <Route exact path='/blog/:id' component={Blog} />
          <Route exact path='/about' component={About} />
          <Route exact path='/' component={LandingPage} />
        </Switch>
      </span>
    </HashRouter>;
  }
}
export default App;