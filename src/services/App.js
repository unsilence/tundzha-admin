import { request } from '../utils';

export async function checkLogin(params) {
  return request(
    'http://01.zxzc.co/Admin/Admin/Login',
    {
      method: 'post',
      body: JSON.stringify(params),
    }
  )
}
