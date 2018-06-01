import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './index.css';
import Home from './components/home';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Route
      path="/"
      component={Home}
    />
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
