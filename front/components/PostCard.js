import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Popover, Avatar, List, Comment } from 'antd';
import {
  RetweetOutlined,
  HeartTwoTone,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';
import { removePost, RETWEET_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const id = useSelector((state) => state.user.user?.id); // optional chaining operator
  const { removePostLoading } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const liked = post.Likers.find((v) => v.id === id);

  const onRetweet = useCallback(() => {
    if (!user) {
      alert('로그인이 필요합니다.')
    }
    console.log(`post.RetweetId: ${post.RetweetId}, post.id: ${post.id}`);
    dispatch({
      type: RETWEET_POST_REQUEST,
      data: post.id
    })
  }, [user]);

  const onLike = useCallback(() => {
    if (!user) {
      alert('로그인이 필요합니다.')
    }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id
    })
  }, [user]);

  const onUnLike = useCallback(() => {
    if (!user) {
      alert('로그인이 필요합니다.')
    }
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id
    })
  }, [user]);

  const onToggleCommentForm = useCallback(() => {
    if (!user) {
      alert('로그인이 필요합니다.')
    }
    setCommentFormOpened((prev) => !prev);
  }, [user]);

  const onRemovePost = useCallback(() => {
    if (!user) {
      alert('로그인이 필요합니다.')
    }
    dispatch(removePost(post.id));
  }, [user]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key='retweet' onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone
              key='heart'
              twoToneColor='red'
              onClick={onUnLike}
            />
          ) : (
            <HeartOutlined key='heart' onClick={onLike} />
          ),
          <MessageOutlined key='message' onClick={onToggleCommentForm} />,
          <Popover
            key='more'
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type='danger' onClick={onRemovePost} loading={removePostLoading}>삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined key='ellipsis' />
          </Popover>,
        ]}
        title={post.content === 'retweet' ? `${post.User.nickname}님이 리트윗 하였습니다.` : null}
        extra={user && <FollowButton post={post} />}
      > {post.content === 'retweet' && post.Retweet ? (
        <Card
          cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
        >
          <Card.Meta
            avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
            title={post.Retweet.User.nickname}
            description={<PostCardContent postData={post.Retweet.content} />} 
          />
        </Card> 
      ) : (
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      )}
    </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout='horizontal'
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          ></List>
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    content: PropTypes.string,
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.object),
    imagePaths: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
