import { request } from '../utils';

export async function checkLogin() {
  return request(
    'http://01.zxzc.co/Admin/Admin/checkLogin',
    {
      method: 'post',
    },
  );
}
