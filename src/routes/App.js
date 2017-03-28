import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';

const App = ({ children }) => {
  return (
    <div className="layout">
      layout
      { children }
    </div>
  );
};

App.propTypes = {};

export default connect((state, ownProps) => {
  return {};
})(App);
