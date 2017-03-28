export default {

  namespace: 'dashboard',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({ type: 'fetch' });
    },
  },

  effects: {
    *fetch(action, { call, put, select }) {  // eslint-disable-line
    },
  },

  reducers: {
    save(state, action) {
      return { ...state};
    },
  },

};
