import utils from '../utils';

export async function checkLogin() {
  return utils.request(
    'http://01.zxzc.co/Admin/Admin/checkLogin',
    {
      method: 'post',
    },
  );
}
