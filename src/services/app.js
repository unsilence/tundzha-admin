import utils from '../utils';

export async function checkLogin() {
  return utils.request(
    '/Admin/Admin/checkLogin',
  );
}

export async function login(data) {
  return utils.request(
    '/Admin/Admin/login',
    {
      body: data,
    },
  );
}
