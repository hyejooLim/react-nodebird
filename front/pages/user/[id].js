// user/[id].js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import Head from 'next/head';
import axios from 'axios';

import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_INFO_REQUEST } from '../../reducers/user';

const User = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { user, userInfo } = useSelector((state) => state.user);
  const { hasMorePosts, mainPosts, loadPostsLoading } = useSelector((state) => state.post);

  useEffect(() => {
    const onScroll = () => {
      if (document.documentElement.scrollHeight - 400 < window.scrollY + document.documentElement.clientHeight) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            data: id,
            lastId,
          });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, id, hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>{userInfo.nickname}님의 게시글</title>
          <meta name='description' content={`${userInfo.nickname}님의 게시글`} />
          <meta property='og:title' content={`${userInfo.nickname}님의 게시글`} />
          <meta property='og:description' content={`${userInfo.nickname}님의 게시글`} />
          <meta property='og:image' content='https://nodebird.com/favicon.ico' />
          <meta property='og:url' content={`https://nodebird.com/user/${id}`} />
        </Head>
      )}
      {userInfo && (userInfo.id !== user?.id) ? (
        <Card
          actions={[
            <div key='twit'>
              게시물
              <br />
              {userInfo.Posts}
            </div>,
            <div key='following'>
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key='follower'>
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
          style={{ marginBottom: '60px' }}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
            description='웹 개발자'
          />
        </Card>
      ) 
      : null}
      {mainPosts && mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
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
  context.store.dispatch({
    type: LOAD_USER_INFO_REQUEST,
    data: context.query.id,
  });
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: context.query.id,
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default User;
