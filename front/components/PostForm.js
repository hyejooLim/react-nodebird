import React, { useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';

import { addPost } from '../reducers/post';

const PostForm = () => {
  const { imagePaths } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const imageInput = useRef();

  const onSubmitForm = useCallback(() => {
    if (value !== ' ') {
      dispatch(addPost);
      setValue('');
    }
  }, [value]);

  const onChangeInput = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType='multipart/form-data'
      onFinish={onSubmitForm}
    >
      <Input.TextArea
        value={value}
        onChange={onChangeInput}
        maxLength={140}
        placeholder='오늘은 어떤 일이 있었나요?'
      />
      <div>
        <input type='file' multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type='primary' htmlType='submit' style={{ float: 'right' }}>
          완료
        </Button>
      </div>
      <div>
        {imagePaths &&
          imagePaths.map((path) => (
            <div key={path} style={{ display: 'inline-block' }}>
              <img src={path} style={{ width: '200px' }} alt={path} />
              <div>
                <Button>업로드 취소</Button>
              </div>
            </div>
          ))}
      </div>
    </Form>
  );
};

export default PostForm;
