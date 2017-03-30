import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

const Dashboard = () => {
  return (
    <div>
      <Link to={'/'}>首页</Link>
      <Link to={'/Dashboard'}>仪盘表</Link>
      <Link to={'/Login'}>登录</Link>
    </div>
  );
};

export default connect()(Dashboard);
