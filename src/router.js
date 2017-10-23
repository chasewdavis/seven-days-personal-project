import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/landing/Landing.js';
import Dashboard from './components/dash/Dash.js';
import Settings from './components/settings/Settings.js';
import Goal from './components/goal/Goal.js';
import Search from './components/search/Search.js';

export default (
    <div>
    <Switch>
        <Route component={Landing} exact path='/' />
        <Route component={Dashboard} path='/dashboard'/>
        <Route component={Goal} exact path='/goal/:id'/>
        <Route component={Settings} path='/goal/:id/settings'/>
        <Route component={Search} path='/search/:id'/>
        {/* <Route path='/nav' render={() => (
            <Nav>
                <Route component={Dashboard} path='/nav/dashboard' />
                <Route component={Goal} path='/nav/goal/:id'/>
            </Nav>
        )}/> */}
    </Switch>
    </div>
  )