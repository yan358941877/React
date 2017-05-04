import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/App';
import About from './modules/About'
import Repos from './modules/Repos'
import Repo from './modules/Repo'
import Home from './modules/Home'
import {Router, Route, IndexRoute,hashHistory, browserHistory} from 'react-router'

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path='/' component={App}>

            <IndexRoute component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/repos' component={Repos}>
                <Route path='/repos/:userName/:repoName' component={Repo}/>
            </Route>
            
        </Route>
        
    </Router>

    ),document.getElementById('app')
);