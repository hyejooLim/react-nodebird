import React, { useCallback } from 'react';
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
  padding: 20px 15px;
  font-family: 'menlo';
`;

const EmailWrapper = styled.div`
  margin-bottom: 10px;
`;

const LoginForm = () => {
  const { logInLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  // onFinish already has 'e.preventDefault'
  const onSubmitForm = useCallback(() => {
    console.log(email, password);
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
