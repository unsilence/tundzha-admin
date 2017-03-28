import { checkLogin } from '../services/app';
import { routerRedux }from 'dva/router';

export default {

  namespace: 'app',

  state: {
    login: false,
    user: {
      name: '吴彦祖',
    },
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys') || '[]'),
  },

  subscriptions: {
    setup({ dispatch, history}){
      dispatch({ type: 'checkLogin' });
    }
  },

  effects: {
    *checkLogin( action, { call, put, select }){
      let result = yield call(checkLogin);
      if(result.data.code < 0){
        yield put(routerRedux.push('/login'));
      }
    },
  },
}
