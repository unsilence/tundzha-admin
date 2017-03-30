import React from 'react';
import { connect } from 'dva';

const User = () => {
  return (
    <div>
      用户管理
    </div>
  );
};

export default connect()(User);
