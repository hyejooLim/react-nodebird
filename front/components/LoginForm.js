import React, { useCallback, useState } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

const FormWrapper = styled(Form)`
  padding: 20px 15px;
`;

const LoginForm = ({ setIsLoggedIn }) => {
  const [id, setId] = useState('');
  const [password, setPassWord] = useState('');

  // props로 넘겨주는 함수는 useCallback
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassWord(e.target.value);
  }, []);

  // onFinish already has 'e.preventDefault'
  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password]);

  return (
    <>
      <FormWrapper onFinish={onSubmitForm}>
        <div>
          <label htmlFor='user-id'>아이디</label>
          <br />
          <Input name='user-id' value={id} onChange={onChangeId} required />
        </div>
        <div>
          <label htmlFor='user-password'>비밀번호</label>
          <br />
          <Input
            name='user-password'
            type='password'
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <ButtonWrapper>
          <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
          <Link href="/signup"><a><Button>회원가입</Button></a></Link>
        </ButtonWrapper>
      </FormWrapper>
    </>
  );
};

export default LoginForm;
