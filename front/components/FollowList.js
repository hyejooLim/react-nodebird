import React from 'react';
import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ListWrapper = styled(List)`
  margin: 20px 0;
`;

const FollowList = ({ header, data }) => {
  return (
    <ListWrapper 
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size='small'
      header={<div>{header}</div>}
      loadMore={<div style={{ textAlign: 'center', margin: '10px 0' }}><Button>더 보기</Button></div>}
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Card actions={[<StopOutlined key='stop' />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  )
}

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default FollowList;