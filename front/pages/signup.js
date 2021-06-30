import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Button, Form, Input, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const FormWrapper = styled(Form)`
  .input_form {
    margin-bottom: 20px;
    font-family: 'menlo';
    font-size: 16px;
    font-weight: 100;
  }
`;

const InputWrapper = styled(Input)`
  width: 600px;
  height: 38px;
`;

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
      Router.replace('/');
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
      <FormWrapper onFinish={onSubmitForm}>
        <div className="input_form">
          <label htmlFor='user-email'>Email</label>
          <br />
          <InputWrapper
            name='user-email'
            value={email}
            type='email'
            required
            onChange={onChangeEmail}
          />
        </div>
        <div className="input_form">
          <label htmlFor='user-nickname'>Nickname</label>
          <br />
          <InputWrapper
            name='user-nickname'
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div className="input_form">
          <label htmlFor='user-password'>Password</label>
          <br />
          <InputWrapper
            name='user-password'
            value={password}
            type='password'
            required
            onChange={onChangePassword}
          />
        </div>
        <div className="input_form">
          <label htmlFor='user-password-check'>Password Check</label>
          <br />
          <InputWrapper
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
        <div className="input_form">
          <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
            약관에 동의합니다.
          </Checkbox>
          {termError && (
            <ErrorMessage>약관에 동의하지 않았습니다.</ErrorMessage>
          )}
        </div>
        <Button htmlType='submit' loading={signUpLoading} style={{ marginTop: 20, background: '#BBD2CC' }}>
          가입하기
        </Button>
      </FormWrapper>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Signup;
