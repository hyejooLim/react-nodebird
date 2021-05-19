import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

const Profile = () => {
  return (
    <>
      <Head>
        <title>NodeBird | 내 프로필</title>
      </Head>
      <AppLayout>my profile</AppLayout>
    </>
  );
};

export default Profile;
