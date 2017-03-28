import React, { PropTypes } from 'react';
import { connect } from 'dva';

const Dashboard = () => {
  return (
    <div>
      草泥马
    </div>
  )
};

export default connect((state, ownProps) => {
  return {
    state: '123',
  }
})(Dashboard);
