import React, { useCallback, useEffect } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { changeNicknameDone } = useSelector((state) => state.user);
  const [nickname, onChangeNickname, setNickname] = useInput('');

  useEffect(() => {
    if (changeNicknameDone) {
      setNickname('');
    }
  }, [changeNicknameDone]);

  const onSubmitForm = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <Form>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore='닉네임'
        enterButton='수정'
        onSearch={onSubmitForm}
      />
    </Form>
  );
};

export default NicknameEditForm;
