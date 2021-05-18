import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';

const AppLayout = ({ children }) => {
  return (
    <div>
      <Menu mode='horizontal'>
        <Menu.Item>
          <Link href='/'><a>노드버드</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/profile'><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item>
        <Menu.Item>
          <Link href='/signup'><a>회원가입</a></Link>
        </Menu.Item>
      </Menu>
      {/* xs: 모바일
          sm: 태블릿
          md: 작은 데스크탑
          gutter: 컬럼 사이의 간격
      */}
      <Row gutter={8}>
        <Col xs={24} md={6}>첫번째 컬럼</Col>
        <Col xs={24} md={12}>{children}</Col>
        <Col xs={24} md={6}>
          <a href="https://cherishvert.tistory.com" target="_blank" ref="noreferrer noopener">Made by Me</a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
