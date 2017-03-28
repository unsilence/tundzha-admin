import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import { routerRedux }from 'dva/router';
import Login from './login'
import skins from '../components/skin.less';

const app = ({ children,app, loading, location, dispatch }) => {
  const { login, loginButtonLoading, user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys } = app;
  const loginProps = {
    loading,
    loginButtonLoading,
    onOk (data) {
      dispatch({ type: 'app/login', payload: data })
    },
  };
  return (
    <div>
      {console.log(login)}
      {
        // 判断登录
        login ?
        <div>
          已登录
          { children }
        </div>
        :
        <div className={skins.spin}>
          <Spin tip="加载用户信息..." spinning={loading.global} size="large">
            <Login {...loginProps} />
          </Spin>
        </div>
      }
    </div>
  );
};

app.propTypes = {};

export default connect((state, ownProps) => {
  console.log(state);
  return {
    app: state.app,
    loading: state.loading
  };
})(app);
