import dva from 'dva';
import createLoading from 'dva-loading';
import { message } from 'antd';

const ERROR_MSG_DURATION = 3; // 3 秒

const app = dva({
  ...createLoading(),
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
  },
});

app.router(require('./router'));

app.start('#app');
