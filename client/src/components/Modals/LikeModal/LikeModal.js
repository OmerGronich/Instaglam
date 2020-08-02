import React from 'react';
import Modal from 'components/Modals/Modal';
import ModalList from 'components/Modals/ModalList/ModalList';
import ModalListItem from 'components/Modals/ModalList/ModalListItem';
import Button from 'components/Button/Button';
import UserIdentifier from 'components/UserIdentifier/UserIdentifier';
import { likePropType, modalPropType } from 'customPropTypes';
import styles from './LikeModal.module.scss';

const LikeModal = ({ isModalOpen, setModalOpen, postLikes, loading }) => {
  const isFollowed = false;
  return (
    <Modal className={styles.modalProperties} isOpen={isModalOpen} setModalOpen={setModalOpen}>
      <ModalList>
        <h1>Likes</h1>
        {!loading && postLikes.map(like => (
          <ModalListItem className={styles.LikeModalItem}>
            <UserIdentifier
              key={like._id}
              username={like.user.username}
              profilePic={like.user.profilePic}
            />
            {isFollowed ? <Button btnRole="primary bold"> Unfollow </Button> : <Button btnRole="primary bold"> Follow</Button>}
          </ModalListItem>
        ))}
        <ModalListItem>
          <Button btnRole="btnBlock astext" onClick={() => setModalOpen(false)}>Cancel</Button>
        </ModalListItem>
      </ModalList>
    </Modal>
  );
};

LikeModal.propTypes = {
  ...likePropType,
  ...modalPropType
};

export default LikeModal;
