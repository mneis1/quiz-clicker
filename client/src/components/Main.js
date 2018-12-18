import React from 'react';
import {Switch, Route} from 'react-router-dom';

import About from './About';
import Login from './Login';
import Register from './Register';
import View from "./View";

const Main = () => (
 <main>
 <Switch>
     <Route exact path="/" component={Login}/>
     <Route exact path="/register" component={Register}/>
     <Route exact path="/view" component={View}/>
     <Route exact path="/about" component={About}/>
 </Switch>
 </main>
);

export default Main;