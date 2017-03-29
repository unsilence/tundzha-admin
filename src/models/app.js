import { checkLogin } from '../services/app';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'app',

  state: {
    login: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'checkLogin' });
    },
  },

  effects: {
    *checkLogin(action, { call, put }) {
      const result = yield call(checkLogin);
      if (result.data.code < 0) {
        yield put(routerRedux.push('/login'));
      }
    },
  },
};
