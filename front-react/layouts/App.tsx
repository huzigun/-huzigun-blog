import React from 'react';

import Home from '@pages/Home';

const About = loadable(() => import('@pages/About'));
const Login = loadable(() => import('@pages/Login'));

import { Link, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

const App = () => {
  return (
    <div className="">
      <h1>Hello react</h1>
      <div className="">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
      </div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </div>
  );
};

export default App;
