import { login, checkLogin } from '../services/app';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'app',

  state: {
    login: false,
    loginBtnLoading: false,
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
        return false;
      }
    },

    *login({ payload }, { call, put }) {
      yield put({ type: 'showLoginButtonLoading' });
      const data = yield call(login, payload);
      if (data.success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: payload.username,
            },
          } });
      } else {
        yield put({
          type: 'loginFail',
        });
      }
    },
  },

  reducers: {
    showLoginButtonLoading(state) {
      return {
        ...state,
        loginButtonLoading: true,
      };
    },
  },

};
