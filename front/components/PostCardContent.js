import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, idx) => {
        if (v.match(/(#[^\s#]+)/g)) {
          return <Link href={`/hashtag/${v.slice(1)}`} key={idx}><a>{v}</a></Link>
        }
        return v;
      })}
    </div>
  );
}

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired
};

export default PostCardContent;