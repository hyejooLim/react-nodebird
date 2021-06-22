import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Button, Form, Input, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { SIGN_UP_REQUEST } from '../reducers/user';

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);

  useEffect(() => {
    if (signUpDone) {
      Router.push('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

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
    console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname }
    });
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>NodeBird | 회원가입</title>
      </Head>
      <Form onFinish={onSubmitForm}>
        <div>
          <label htmlFor='user-email'>이메일</label>
          <br />
          <Input
            name='user-email'
            value={email}
            type='email'
            required
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor='user-nickname'>닉네임</label>
          <br />
          <Input
            name='user-nickname'
            value={nickname}
            required
            onChange={onChangeNickname}
          />
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
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </div>
        <div>
          <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
            약관에 동의합니다.
          </Checkbox>
          {termError && (
            <ErrorMessage>약관에 동의하지 않았습니다.</ErrorMessage>
          )}
        </div>
        <Button type='primary' htmlType='submit' loading={signUpLoading} style={{ marginTop: 20 }}>
          가입하기
        </Button>
      </Form>
    </AppLayout>
  );
};

export default Signup;
