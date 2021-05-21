import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Button, Form, Input, Checkbox } from 'antd';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const [id, onChangeId] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  // Error Check
  const onSubmitForm = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    // Signup successful
    console.log(id, nickname, password);
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>NodeBird | 회원가입</title>
      </Head>
      <Form onFinish={onSubmitForm}>
        <div>
          <label htmlFor='user-id'>아이디</label>
          <br />
          <Input name='user-id' value={id} required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor='user-nickname'>닉네임</label>
          <br />
          <Input name='user-nickname' value={nickname} required onChange={onChangeNickname} />
        </div>
        <div>
          <label htmlFor='user-password'>비밀번호</label>
          <br />
          <Input
            name='user-password'
            value={password}
            type='password'
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor='user-password-check'>비밀번호 확인</label>
          <br />
          <Input
            name='user-password-check'
            value={passwordCheck}
            type='password'
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>약관에 동의합니다.</Checkbox>
          {termError && <ErrorMessage>약관에 동의하지 않았습니다.</ErrorMessage>}
        </div>
        <Button type='primary' htmlType='submit' style={{ marginTop: 20 }}>가입하기</Button>
      </Form>
    </AppLayout>
  );
};

export default Signup;
