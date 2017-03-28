import React from 'react';
import { Router, Route } from 'dva/router';
import App from '../routes/App';

// Models注册方法
const cached = {};
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
};

const Routers = (({ history, app }) => {
  // 按需加载
  const routes = [
    {
      path: '/',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('../models/App'));
          cb(null, require('../routes/App'));
        }, 'App');
      },
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('../models/Dashboard'));
          cb(null, { component: require('../routes/Dashboard') });
        }, 'Dashboard');
      },
    },
  ];

  return <Router history={history} routes={routes} />
});

export default Routers;
