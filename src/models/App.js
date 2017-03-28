import { checkLogin } from '../services/App';
export default {

  namespace: 'App',

  state: {},

  subscriptions: {
    setup({ dispatch, history}){
      dispatch({ type: 'checkLogin' });
    }
  },

  effects: {
    *checkLogin( action, { call, put, select }){
      let result = yield call(checkLogin,{ username: '624508914', password: '23412313' });
      console.log(result.data);
    },
  }
}
