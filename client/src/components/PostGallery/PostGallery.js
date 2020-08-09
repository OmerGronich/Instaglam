import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Post from 'components/Post/Post';
import { changeUrl } from 'utils/changeUrl';
import { postPropType } from 'customPropTypes';
import styles from './PostGallery.module.scss';

const PostGallery = ({ post, posts, isGallery }) => {
  const [currentPost, setCurrentPost] = useState(post);
  const currentPostIndex = posts.indexOf(currentPost);

  const next = () => {
    if (currentPostIndex > posts.length - 1) {
      return;
    }

    changeUrl(`/p/${posts[currentPostIndex + 1]._id}`, 'post modal path');
    setCurrentPost(posts[currentPostIndex + 1]);
  };

  const prev = () => {
    if (currentPostIndex < 0) {
      return;
    }

    changeUrl(`/p/${posts[currentPostIndex - 1]._id}`, 'post modal path');
    setCurrentPost(posts[currentPostIndex - 1]);
  };

  return (
    <div className={styles.Gallery}>
      <Post post={currentPost} />
      {isGallery && (
      <div className={styles.arrows}>
        {!!currentPostIndex && (
        <button className={styles.left} type="button" onClick={prev}>
          <FaChevronLeft />
        </button>
        )}
        {currentPostIndex < posts.length - 1 && (
        <button className={styles.right} type="button" onClick={next}>
          <FaChevronRight />
        </button>
        )}
      </div>
      )}
    </div>
  );
};

PostGallery.propTypes = {
  post: PropTypes.shape(postPropType).isRequired,
  isGallery: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(postPropType).isRequired
};

export default PostGallery;
