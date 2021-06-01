import React, { useCallback, useState } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.post.User?.id);
  const [value, setValue] = useState('');

  const onSubmitForm = useCallback(() => {
    console.log(post.id, value);
  }, [value]); 

  const onChangeText = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <Form onFinish={onSubmitForm} style={{ marginTop: '10px' }}>
      <Form.Item>
        <Input.TextArea rows={4} value={value} onChange={onChangeText} />
        <Button type='primary' htmlType='submit' style={{ float: 'right', marginTop: '10px' }}>삐약</Button>
      </Form.Item>
    </Form>
  );
}

CommentForm.propTypes = {
  post: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommentForm;