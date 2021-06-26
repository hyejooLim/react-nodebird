import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_INFO_REQUEST } from '../reducers/user';

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
    dispatch({ type: LOAD_USER_INFO_REQUEST });
  }, []);

  useEffect(() => {
    dispatch({ type: LOAD_POSTS_REQUEST });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (document.documentElement.scrollHeight - 400 < window.scrollY + document.documentElement.clientHeight) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          })
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      {user && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
