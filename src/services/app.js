import utils from '../utils';

export async function checkLogin() {
  return utils.request(
    'http://01.zxzc.co/Admin/Admin/checkLogin',
    {
      method: 'post',
    },
  );
}

export async function login(data) {
  return utils.request(
    'http://01.zxzc.co/Admin/Admin/login',
    {
      method: 'post',
      body: JSON.stringify(data),
    },
  );
}
