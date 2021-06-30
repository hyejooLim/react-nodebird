import React, { useCallback } from 'react';
import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { UNFOLLOW_REQUEST, BLOCK_FOLLOWER_REQUEST } from '../reducers/user';

const ListWrapper = styled(List)`
  margin: 20px 0;
  background: #F2F2F2;
`;

const FollowList = ({ header, data, onClickMore, loading }) => {
  const dispatch = useDispatch();

  const onCancel = (id) => () => {
    if (header === '팔로잉 목록') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    }
    dispatch({
      type: BLOCK_FOLLOWER_REQUEST,
      data: id,
    });
  };

  return (
    <ListWrapper
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size='small'
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <Button onClick={onClickMore} loading={loading}>
            더 보기
          </Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card
            actions={[<StopOutlined key='stop' onClick={onCancel(item.id)} />]}
            style={{ marginLeft: '20px', marginTop: '20px', width: '100px', textAlign: 'center', background: '#92C4B7' }}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FollowList;
