import React, { useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

const FormWrapper = styled(Form)`
  margin-left: 70px;
  font-family: 'menlo';
  padding: 30px 50px;
  width: 350px;
  background: #fff;
  box-shadow: 10px 8px 10px -2px rgba(0,0,0,0.29);
  -webkit-box-shadow: 10px 8px 10px -2px rgba(0,0,0,0.29);
  -moz-box-shadow: 10px 8px 10px -2px rgba(0,0,0,0.29);
`;

const EmailWrapper = styled.div`
  margin-bottom: 10px;
`;

const LoginForm = () => {
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  // onFinish already has 'e.preventDefault'
  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <>
      <FormWrapper onFinish={onSubmitForm}>
        <EmailWrapper>
          <label htmlFor='user-email'>이메일</label>
          <br />
          <Input
            name='user-email'
            value={email}
            type='email'
            onChange={onChangeEmail}
            placeholder='email'
            required
            style={{ height: '40px' }}
          />
        </EmailWrapper>
        <div>
          <label htmlFor='user-password'>비밀번호</label>
          <br />
          <Input
            name='user-password'
            type='password'
            value={password}
            onChange={onChangePassword}
            placeholder="password"
            required
            style={{ height: '40px' }}
          />
        </div>
        <ButtonWrapper>
          <Button type='primary' htmlType='submit' loading={logInLoading}>
            로그인
          </Button>
          <Link href='/signup'>
            <a>
              <Button style={{ float: 'right' }}>회원가입</Button>
            </a>
          </Link>
        </ButtonWrapper>
      </FormWrapper>
    </>
  );
};

export default LoginForm;
