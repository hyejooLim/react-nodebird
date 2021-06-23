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
import { removePost, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const id = useSelector((state) => state.user.user?.id); // optional chaining operator
  const { removePostLoading } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const liked = post.Likers.find((v) => v.id === id);

  const onLike = useCallback(() => {
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id
    })
  }, []);

  const onUnLike = useCallback(() => {
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id
    })
  }, []);

  const onToggleCommentForm = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch(removePost(post.id));
  }, []);

  return (
    <div style={{ marginBottom: '20px' }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key='retweet' />,
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
        extra={user && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
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
