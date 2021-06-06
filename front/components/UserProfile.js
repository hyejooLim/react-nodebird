import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { logoutRequestAction } from '../reducers/user';

const CardWrapper = styled(Card)`
  text-align: center;
`;

const ButtonWrapper = styled(Button)`
  margin-top: 20px;
`;

const UserProfile = () => {
  const { user, logOutLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
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
        avatar={<Avatar>{user.nickname[0]}</Avatar>}
        title={user.nickname}
        description='Happy Day'
      />
      <ButtonWrapper onClick={onLogOut} loading={logOutLoading}>로그아웃</ButtonWrapper>
    </CardWrapper>
  );
};

export default UserProfile;
