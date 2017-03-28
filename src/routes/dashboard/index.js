import React, { PropTypes } from 'react';
import { connect } from 'dva';

const dashboard = () => {
  return (
    <div>
      仪盘表
    </div>
  )
};

export default connect((state, ownProps) => {
  return {}
})(dashboard);
