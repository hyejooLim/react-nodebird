import React, { useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import useInput from '../hooks/useInput';
import { loginAction } from '../reducers/user';

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

const FormWrapper = styled(Form)`
  padding: 20px 15px;
  font-family: 'menlo';
`;

const IdWrapper = styled.div`
  margin-bottom: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  // onFinish already has 'e.preventDefault'
  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    dispatch(loginAction({ id, password }));
  }, [id, password]);

  return (
    <>
      <FormWrapper onFinish={onSubmitForm}>
        <IdWrapper>
          <label htmlFor='user-id'>아이디</label>
          <br />
          <Input
            name='user-id'
            value={id}
            onChange={onChangeId}
            placeholder='email'
            required
          />
        </IdWrapper>
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
          <Button type='primary' htmlType='submit' loading={false}>
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
