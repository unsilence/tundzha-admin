import { login, checkLogin } from '../services/app';
import { routerRedux } from 'dva/router';
import { notification } from 'antd';
import { storage } from '../utils';

export default {

  namespace: 'app',

  state: {
    login: false,
    user: {
      nickname: '游客',
    },
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

      if (!result.data.code) {
        yield put({ type: 'loginSuccess' });
      }

      notification.error({
        message: '温馨提示',
        description: result.data.message || result.data.error || '未登录',
        duration: 3,
      });
    },

    *login({ payload }, { call, put }) {
      yield put({ type: 'showLoginButtonLoading' });
      const result = yield call(login, payload);

      if (!result.data.code) {
        storage.set('user', result.data.dataset);
        yield put({ type: 'loginSuccess' });
        notification.success({
          message: '温馨提示',
          description: result.data.message || '登录成功',
          duration: 3,
        });
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
    loginSuccess(state) {
      if (storage.get('user')) {
        state.user = storage.get('user');
      }
      return {
        ...state,
        login: true,
        loginBtnLoading: false,
      };
    },
    loginFail(state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false,
      };
    },
  },

};
