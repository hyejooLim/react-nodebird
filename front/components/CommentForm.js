import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { addComment } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.post.User?.id);
  const { addCommentDone } = useSelector((state) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitForm = useCallback(() => {
    dispatch(addComment({ content: commentText, postId: post.id, userId: id }));
  }, [commentText, id]); 

  return (
    <Form onFinish={onSubmitForm} style={{ marginTop: '10px' }}>
      <Form.Item>
        <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
        <Button type='primary' htmlType='submit' style={{ float: 'right', marginTop: '10px' }}>삐약</Button>
      </Form.Item>
    </Form>
  );
}

CommentForm.propTypes = {
  post: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommentForm;