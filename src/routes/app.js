import React from 'react';
import { connect } from 'dva';

// 入口判断
const App = ({ children, app }) => {
  const { login } = app;

  return (
    <div>
      { login ? <div>{children}</div> : children }
    </div>
  );
};

App.propTypes = {};

export default connect((state) => {
  return {
    app: state.app,
  };
})(App);
