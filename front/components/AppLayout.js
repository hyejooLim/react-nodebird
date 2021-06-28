import React, { useCallback } from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import LoginForm from '../components/LoginForm';
import UserProfile from '../components/UserProfile';
import useInput from '../hooks/useInput';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const [searchInput, onChangeSearchInput] = useInput('');
  const { user } = useSelector((state) => state.user);
  
  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

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
          <SearchInput 
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch} 
            />
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
      <Row gutter={30}>
        <Col xs={24} md={6}>
          {user ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>{children}</Col>
        <Col xs={24} md={6}>
          <a href="https://cherishvert.tistory.com" target="_blank" rel="noreferrer noopener">Made by Me</a>
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
