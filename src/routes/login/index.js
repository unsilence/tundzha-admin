import React, { PropTypes } from 'react';
import { Button, Row, Form, Input } from 'antd';
import { config } from '../../utils';
import loginSkin from './index.less';

const FormItem = Form.Item;

const Login = ({ form: { getFieldDecorator, validateFieldsAndScroll } }) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return false;
      }
      // todo: 登录事件
    });
  }

  return (
    <div className={loginSkin.form}>
      <div className={loginSkin.logo}>
        <img alt={'logo'} src={config.logoSrc} />
        <span>Ant Design</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请填写用户名',
              },
            ],
          })(<Input size="large" onPressEnter={handleOk} placeholder="用户名" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请填写密码',
              },
            ],
          })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="密码" />)}
        </FormItem>
        <Row>
          <Button type="primary" size="large" onClick={handleOk} loading="true">
            登录
          </Button>
        </Row>
        <p>
          <span>账号：guest</span>
          <span>密码：guest</span>
        </p>
      </form>
    </div>
  );
};

Login.propTypes = {
  form: PropTypes.object,
};

export default Form.create()(Login);
