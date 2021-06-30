import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import useSWR from 'swr';

import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const { user } = useSelector((state) => state.user);

  const { data: followersData, error: followerError } = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher);
  const { data: followingsData, error: followingError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher);

  useEffect(() => {
    if (!(user && user.id)) {
      Router.replace('/');
    }
  }, [user && user.id]);

  const onLoadFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  const onLoadFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  if (!user) {
    return <div>홈 화면으로 이동 중...</div>;
  }

  if (followingError || followerError) {
    return <div>팔로워/팔로잉 로드 실패하였습니다.</div>;
  }
  
  return (
    <>
      <Head>
        <title>NodeBird | 내 프로필</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList 
          header='팔로잉 목록' 
          data={followingsData} 
          onClickMore={onLoadFollowings} 
          loading={!followingsData && !followingError} 
        />
        <FollowList 
          header='팔로워 목록' 
          data={followersData} 
          onClickMore={onLoadFollowers} 
          loading={!followersData && !followerError} 
        />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Profile;
