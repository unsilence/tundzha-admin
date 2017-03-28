import dva from 'dva';
import createLoading from 'dva-loading';
import { message } from 'antd';

const ERROR_MSG_DURATION = 3; // 3 秒

const app = dva();
// 1. Initialize
// const app = dva({
//   onError(e) {
//     message.error(e.message, ERROR_MSG_DURATION);
//   },
// });

// 2. Plugins
app.use(createLoading());

// 3. Model
// Moved to router.js

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#app');
