import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import Gist from 'react-gist';
import { Link } from "react-router-dom";


import LandingPage from './app/LandingPage/LandingPage';
import BlogList from './app/BlogList/BlogList';
import Categories from './app/Categories/Categories';
import Blog from './app/Blog/Blog';
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
    return <BrowserRouter>
      <span className="root">
        <Navbar className="desktop-nav" color="light" light expand="md">
          <Link className="navbar-brand" to={{ pathname: '/' }}>WebTutor</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to={{ pathname: constants.routeLinks.categories }}>Topics</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to={{ pathname: constants.routeLinks.about }}>About me</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="cover-image">
        </div>
        <Switch>
          <Route exact path='/topics' component={Categories} />
          <Route exact path='/blogs' component={BlogList} />
          <Route exact path='/blog' component={Blog} />
          <Route exact path='/' component={LandingPage} />
        </Switch>
      </span>
    </BrowserRouter>;
  }
}
export default App;