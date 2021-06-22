import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(user && user.id)) {
      Router.replace('/');
    }
  }, [user && user.id]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>NodeBird | 내 프로필</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header='팔로잉 목록' data={user.Followings} />
        <FollowList header='팔로워 목록' data={user.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
