import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PostModal from 'components/Modals/PostModal/PostModal';
import Button from 'components/Button/Button';
import { postPropType } from 'customPropTypes';
import { getAllCommentsOfAPost } from 'actions/posts/postActions';

import styles from './CommentList.module.scss';
import HomePagePostComments from '../HomePagePostComments/HomePagePostComments';

const CommentList = ({ post }) => {
  const dispatch = useDispatch();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const commentHandler = () => {
    dispatch(getAllCommentsOfAPost(post._id));
  };
  const handleClick = () => {
    setIsPostModalOpen(true);
    commentHandler();
  };
  return (
    <div>
      {post.numOfComments > 2 ? (
        <div className={styles.commentListWrapper}>
          <Button btnRole="astext disabled" onClick={handleClick}>
            View all
            {' '}
            {post.numOfComments}
            {' '}
            comments
          </Button>
          {isPostModalOpen && (
          <PostModal isOpen={isPostModalOpen} setModalOpen={setIsPostModalOpen} post={post} />
          )}
        </div>
      ) : ''}
      <div>
        <HomePagePostComments postComments={post.comments} />
      </div>
    </div>
  );
};

CommentList.propTypes = {
  ...postPropType
};

export default CommentList;
