import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { logoutRequestAction } from '../reducers/user';

const CardWrapper = styled(Card)`
  text-align: center;
  margin: 50px 0 0 50px;
  box-shadow: 10px 8px 10px -2px rgba(0,0,0,0.29);
  -webkit-box-shadow: 10px 8px 10px -2px rgba(0,0,0,0.29);
  -moz-box-shadow: 10px 8px 10px -2px rgba(0,0,0,0.29);
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
        <div key='twit'><Link href={`/user/${user.id}`}><a>게시물<br />{user.Posts.length}</a></Link></div>,
        <div key='followings'><Link href='/profile'><a> 팔로잉<br />{user.Followings.length}</a></Link></div>,
        <div key='followers'><Link href='/profile'><a>팔로워<br />{user.Followers.length}</a></Link></div>,
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
