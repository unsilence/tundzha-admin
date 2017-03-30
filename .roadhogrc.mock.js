
export default {
  'POST /api/Admin/Login/checkLogin'(req, res) {
    res.json({ code: 0, message: '已登录' });
  },
  'POST /api/Admin/Login/login'(req, res) {
    const user = {
      code: 0,
      message: '登录成功',
      dataset: {
        nickname: '杨圆建',
        source: 'Mock数据',
      },
    };
    res.json(user);
  },
};
