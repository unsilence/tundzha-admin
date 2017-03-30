import utils from '../utils';

export async function checkLogin() {
  return utils.request(
    '/Admin/Login/checkLogin',
  );
}

export async function login(data) {
  return utils.request(
    '/Admin/Login/login',
    {
      body: data,
    },
  );
}
