import React, { useCallback } from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { FaEarlybirds } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { BiRocket } from 'react-icons/bi';

import LoginForm from '../components/LoginForm';
import UserProfile from '../components/UserProfile';
import useInput from '../hooks/useInput';

const MenuWrapper = styled(Menu)`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  height: 56px;
  margin-bottom: 100px;

  .icon {
    display: inline-block;
    margin-right: 10px;
    font-size: 24px;
    position: relative;
    top: 5px;
  }
`;

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
      <MenuWrapper mode='horizontal'>
        <Menu.Item>
          <div className="icon"><FaEarlybirds /></div>
          <Link href='/'><a>NodeBird</a></Link>
        </Menu.Item>
        <Menu.Item>
          <div className="icon"><ImProfile /></div>
          <Link href='/profile'><a>Profile</a></Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput 
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch} 
            style={{ width: '500px' }}
            />
        </Menu.Item>
        <Menu.Item>
          <div className="icon"><BiRocket /></div>
          <Link href='/signup'><a>Signup</a></Link>
        </Menu.Item>
      </MenuWrapper>
      {/* xs: 모바일
          sm: 태블릿
          md: 작은 데스크탑
          gutter: 컬럼 사이의 간격
      */}
      <Row gutter={160}>
        <Col xs={16} md={8}>
          {user ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={16} md={13}>{children}</Col>
        {/* <Col xs={24} md={6}>
          <a href="https://cherishvert.tistory.com" target="_blank" rel="noreferrer noopener">Made by Me</a>
        </Col> */}
      </Row>
    </div>
  );
};

export default AppLayout;
