import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { Card, Avatar } from 'antd';
import { END } from 'redux-saga';

import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import { LOAD_USER_INFO_REQUEST } from '../reducers/user';

const About = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>NodeBird | JOO</title>
      </Head>
      {userInfo ? (
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
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
            description='웹 개발자'
          />
        </Card>
      ) : null}
    </AppLayout>
  );
};

// getStaticProps: 미리 HTML 문서로 만들어 놓음
export const getStaticProps = wrapper.getStaticProps(async (context) => {
  context.store.dispatch({
    type: LOAD_USER_INFO_REQUEST,
    data: 1
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default About;
