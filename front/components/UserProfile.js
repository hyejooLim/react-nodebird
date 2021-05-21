import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';

const CardWrapper = styled(Card)`
  text-align: center;
`;

const ButtonWrapper = styled(Button)`
  margin-top: 20px;
`;

const UserProfile = ({ setIsLoggedIn }) => {
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <CardWrapper
      actions={[
        <div key='twit'>게시물<br />0</div>,
        <div key='followings'>팔로잉<br />0</div>,
        <div key='followers'>팔로워<br />0</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>🌈</Avatar>}
        title='dlagpwn24'
        description='Happy Day'
      />
      <ButtonWrapper onClick={onLogOut}>로그아웃</ButtonWrapper>
    </CardWrapper>
  );
};

export default UserProfile;
