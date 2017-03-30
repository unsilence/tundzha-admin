import { login, checkLogin } from '../services/app';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { storage } from '../utils';

const INFO_MSG_DURATION = 1; // 1秒
const SUCCESS_MSG_DURATION = 1; // 1秒
const ERROR_MSG_DURATION = 1; // 3秒

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
      console.log(result, 11232);
      if (!result.data.code) {
        // 同步用户信息
        yield put({ type: 'updateUser', payload: { user: storage.get('user') } });
        return false;
      }

      // 未登录 退出登录
      storage.clear();
      message.error(result.data.message, ERROR_MSG_DURATION);

      yield put({ type: 'logout' });
    },

    *login({ payload }, { call, put }) {
      yield put({ type: 'showLoginButtonLoading' });
      const result = yield call(login, payload);

      if (!result.data.code) {
        // 登录成功
        storage.set('login', true);
        storage.set('user', result.data.dataset);
        message.success(result.data.message, SUCCESS_MSG_DURATION);

        yield put({ type: 'loginSuccess', payload: { user: result.data.dataset } });
      } else {
        // 登录失败
        storage.clear();
        message.error(result.data.message, ERROR_MSG_DURATION);
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
    loginSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        loginBtnLoading: false,
      };
    },
    logout(state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false,
      };
    },
    updateUser(state, action) {
      return {
        ...state,
        ...action.payload,
        login: false,
        loginButtonLoading: false,
      };
    },
  },

};
