import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import { message } from 'antd';

const ERROR_MSG_DURATION = 1; // 3 秒

const app = dva({
  history: browserHistory,
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
  },
});

app.use(createLoading({
  effects: true,
}));

app.router(require('./router'));

app.start('#app');
