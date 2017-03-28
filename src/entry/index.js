import dva from 'dva';
import createLoading from 'dva-loading';
import { notification } from 'antd';

const ERROR_MSG_DURATION = 3; // 3 秒

const app = dva({
  onError(e) {
    notification['error']({
      message: '温馨提示',
      description: e.message,
      duration: ERROR_MSG_DURATION,
    });
  },
});

app.use(createLoading());

app.router(require('./router'));

app.start('#app');
