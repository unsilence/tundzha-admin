import React from 'react';
import { connect } from 'dva';
import Login from './login';

// 主视图
const MainLayout = ({ child }) => {
  return (
    <div>
      已登录
      { child }
    </div>
  );
};

MainLayout.propTypes = {};

// 登录视图
const LoginLayout = ({ loginProps }) => {
  return (
    <div>
      <Login {...loginProps} />
    </div>
  );
};

LoginLayout.propTypes = {};

// 入口判断
const App = ({ children, app, loading, dispatch }) => {
  const { login, loginButtonLoading } = app;

  const loginProps = {
    loading,
    loginButtonLoading,
    handleLogin(data) {
      dispatch({ type: 'app/login', payload: data });
    },
  };

  return (
    <div>
      { login ? <MainLayout child={children} /> : <LoginLayout loginProps={loginProps} /> }
    </div>
  );
};

App.propTypes = {};

export default connect((state) => {
  return {
    app: state.app,
    loading: state.loading,
  };
})(App);
