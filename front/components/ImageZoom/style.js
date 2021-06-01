import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const Header = styled.header`
  height: 40px;
  background: white;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 15px;
    line-height: 40px;
  }
`;

export const CloseBtn = styled(CloseOutlined)`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  font-size: 20px;
`;

export const SliderWrapper = styled.div`
  height: calc(100% -40px);
  background: #090909;

  & div {
    text-align: center;
  }
`;

export const ImageWrapper = styled.div`
  padding: 20px;
  text-align: center;

  & img {
    margin: 0 auto;
    max-height: 600px;
  }
`;

export const Indicator = styled.div`
  text-align: center;

  & > div {
    width: 74px;
    height: 30px;
    border-radius: 15px;
    background: #313131;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
    position: relative;
    bottom: 12px;
  }
`;
