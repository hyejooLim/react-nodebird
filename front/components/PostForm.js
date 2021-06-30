import React, { useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';

import useInput from '../hooks/useInput';
import { addPost } from '../reducers/post';
import { UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, addPostDone } = useSelector((state) => state.post);

  const [postText, onChangePostText, setPostText] = useInput('');
  const imageInput = useRef();
  
  useEffect(() => {
    if (addPostDone) {
      setPostText('');
    }
  }, [addPostDone]);

  const onSubmitForm = useCallback(() => {
    if (!postText || !postText.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((path) => {
      formData.append('image', path);
    });
    formData.append('text', postText);
    dispatch(addPost(formData));
  }, [postText, imagePaths]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData
    })
  }, []);

  const onRemoveImage = useCallback((idx) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: idx
    })
  }, []);

  return (
    <Form
      style={{ margin: '50px 0' }}
      encType='multipart/form-data'
      onFinish={onSubmitForm}
    >
      <Input.TextArea
        value={postText}
        onChange={onChangePostText}
        maxLength={140}
        placeholder='오늘은 어떤 일이 있었나요?'
        style={{ height: '100px' }}
      />
      <ButtonWrapper>
        <input type='file' name='image' multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type='primary' htmlType='submit' style={{ float: 'right' }}>
          완료
        </Button>
      </ButtonWrapper>
      <div>
        {imagePaths &&
          imagePaths.map((path, idx) => (
            <div key={path} style={{ display: 'inline-block' }}>
              <img src={`http://localhost:3065/${path}`} style={{ width: '200px' }} alt={path} />
              <div>
                <Button onClick={onRemoveImage(idx)}>업로드 취소</Button>
              </div>
            </div>
          ))}
      </div>
    </Form>
  );
};

export default PostForm;
