import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetPostError } = useSelector((state) => state.post);

  useEffect(() => {
    if (retweetPostError) {
      alert(retweetPostError);
    }
  }, [retweetPostError]);

  useEffect(() => {
    function onScroll() {
      if (document.documentElement.scrollHeight - 400 < window.scrollY + document.documentElement.clientHeight) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId
          })
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <AppLayout>
      {user && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

// Home 컴포넌트보다 먼저 실행되어 데이터가 채워진 상태로 렌더링됨 (SSR)
// SSR의 경우 브라우저가 개입하지 않으므로 프론트 서버에서 백엔드 서버로 쿠키를 보내줘야 함
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) { // 쿠키가 공유되는 문제 방지
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  });
  context.store.dispatch({ 
    type: LOAD_POSTS_REQUEST 
  }); // 결과를 HYDRATE로 보내줌

  // REQUEST -> SUCCESS 될 때까지 기다림
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Home;
