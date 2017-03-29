import React, { PropTypes } from 'react';
import { Button, Row, Form, Input } from 'antd';
import utils from '../../utils';
import styles from './index.less';

const FormItem = Form.Item;

const Login = ({
  loginBtnLoading,
  onLogin,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return false;
      }
      // 登录事件
      onLogin(values);
    });
  }

  return (
    <div className={styles['login-container']}>
      <div className={styles.logo}>
        <img alt={utils.config.logoText} src={utils.config.logoSrc} />
        <span>{utils.config.name}</span>
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
          <Button type="primary" size="large" onClick={handleOk} loading={loginBtnLoading}>
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
