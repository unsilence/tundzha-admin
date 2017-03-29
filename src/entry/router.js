import React from 'react';
import { Router } from 'dva/router';

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
      name: '首页',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('../models/app'));
          cb(null, require('../routes/app'));
        }, 'app');
      },
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('../models/dashboard'));
          cb(null, { component: require('../routes/dashboard') });
        }, 'dashboard');
      },
      childRoutes: [
        {
          path: 'login',
          name: '登录',
          getIndexRoute(nextSate, cb) {
            require.ensure([], (require) => {
              cb(null, { component: require('../routes/login') });
            }, 'login');
          },
        },
      ],
    },
  ];

  return <Router history={history} routes={routes} />;
});

export default Routers;
