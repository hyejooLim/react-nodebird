import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

import ImageZoom from './ImageZoom';

const PostImages = ({ images }) => {
  const [imageZoom, setImageZoom] = useState(false);

  const onZoom = useCallback(() => {
    setImageZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setImageZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          role='presentation'
          onClick={onZoom}
          style={{ width: '50%', display: 'inline-block' }}
        />
        {imageZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  } else if (images.length === 2) {
    return (
      <>
        <img
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          role='presentation'
          onClick={onZoom}
          style={{ width: '50%', display: 'inline-block' }}
        />
        <img
          src={`http://localhost:3065/${images[1].src}`}
          alt={images[1].src}
          role='presentation'
          onClick={onZoom}
          style={{ width: '50%', display: 'inline-block' }}
        />
        {imageZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  }

  return (
    <>
      <img
        src={`http://localhost:3065/${images[0].src}`}
        alt={images[0].src}
        role='presentation'
        onClick={onZoom}
        style={{ width: '50%', display: 'inline-block' }}
      />
      <div
        role='presentation'
        style={{
          display: 'inline-block',
          width: '50%',
          textAlign: 'center',
          verticalAlign: 'middle',
        }}
        onClick={onZoom}
      >
        <PlusOutlined />
        <br />
        {images.length - 1}개의 사진 더 보기
      </div>
      {imageZoom && <ImageZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostImages;
