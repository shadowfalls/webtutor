import React from 'react';
import { Route } from "react-router-dom";

export default (
    <Route>
        <Route exact path='/' />
        <Route exact path='/topics' />
        <Route exact path='/blogs/:name/:id' />
        <Route exact path='/blog/:id' />
    </Route>
);