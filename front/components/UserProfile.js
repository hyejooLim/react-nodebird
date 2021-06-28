import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

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
        <Link href={`/user/${user.id}`}><a><div key='twit'>게시물<br />{user.Posts.length}</div></a></Link>,
        <Link href='/profile'><a><div key='followings'>팔로잉<br />{user.Followings.length}</div></a></Link>,
        <Link href='/profile'><a><div key='followers'>팔로워<br />{user.Followers.length}</div></a></Link>,
      ]}
    >
      <Card.Meta
        avatar={(
          <Link href={`/user/${user.id}`}>
            <a><Avatar>{user.nickname[0]}</Avatar></a>
          </Link>
        )}
        title={user.nickname}
        description='Happy Day'
      />
      <ButtonWrapper onClick={onLogOut} loading={logOutLoading}>로그아웃</ButtonWrapper>
    </CardWrapper>
  );
};

export default UserProfile;
