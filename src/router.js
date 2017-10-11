import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/landing/Landing.js';
import Dashboard from './components/dash/Dash.js';
import Nav from './components/nav/Nav.js'
import Goal from './components/goal/Goal.js'

export default (
    <div>
    <Switch>
        <Route component={Landing} exact path='/' />
        <Route path='/nav' render={() => (
            <Nav>
                <Route component={Dashboard} path='/nav/dashboard' />
                <Route component={Goal} path='/nav/goal/:id'/>
            </Nav>
        )}/>
    </Switch>
    </div>
  )