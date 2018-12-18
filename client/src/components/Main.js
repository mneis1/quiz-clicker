import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import About from './About';

const Main = () => (
 <main>
 <Switch>
     <Route exact path="/" component={Login}/>
     <Route exact path="/register" component={Register}/>
     <Route exact path="/about" component={About}/>
 </Switch>
 </main>
);

export default Main;