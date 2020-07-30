import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'components/Alert/Alert';
import Modal from 'components/Modals/Modal';
import ModalList from 'components/Modals/ModalList/ModalList';
import ModalListItem from 'components/Modals/ModalList/ModalListItem';
import Button from 'components/Button/Button';
import { setProfilePicAlert } from 'actions/alerts/alertActions';
import { removeProfilePic, uploadProfilePic } from 'actions/auth/authActions';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { searchedUserPropType } from 'customPropTypes';
import styles from './ProfilePage.module.scss';

const ProfilePicChanger = (
  { authenticatedUsername,
    searchedUserLoading,
    searchedUser
  }
) => {
  const {
    message, alertLocation
  } = useSelector(state => state.alert);

  const dispatch = useDispatch();

  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

  const toggleProfilePicModal = () => {
    if (!searchedUserLoading && (searchedUser.username === authenticatedUsername)) {
      setSettingsModalOpen(!isSettingsModalOpen);
    }
  };

  const handleSelectedFile = e => {
    if (e.target.files[0].size > 1000000) {
      dispatch(
        setProfilePicAlert('The maximum size for a profile picture is 1mb', 'Error', 'Profile')
      );
      setTimeout(() => {
        dispatch(setProfilePicAlert('', null, ''));
      }, 4500);
      setSettingsModalOpen(false);
    }
    dispatch(uploadProfilePic(e.target.files[0]));
    setSettingsModalOpen(false);
  };

  const removeCurrentPhoto = () => {
    dispatch(removeProfilePic());
    setSettingsModalOpen(false);
  };

  return (
    <>
      <div className={styles.profilePageProfilePic}>
        <button
          type="button"
          className={styles.changeProfilePicButton}
          onClick={toggleProfilePicModal}
        >
          {searchedUserLoading && !searchedUser.profilePic
            ? <LoadingSpinner style={{ width: '150px', height: '150px' }} />
            : (
              <div className={styles.profilePic}>
                <img
                  alt="Change avatar"
                  src={searchedUser.profilePic}
                />
              </div>
            )}
        </button>
        {alertLocation === 'Profile' && <Alert alert={message} style={{ fontSize: '10px' }} />}
      </div>
      {isSettingsModalOpen && (
      <Modal
        isOpen={isSettingsModalOpen}
        setModalOpen={setSettingsModalOpen}
        isAnimated
      >
        <ModalList>
          <h3>Change Profile Photo</h3>
          <ModalListItem>
            <label htmlFor="profilePic" className={styles.uploadPhoto}>
              Upload Photo
            </label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              onChange={handleSelectedFile}
              style={{ display: 'none' }}
            />
          </ModalListItem>
          <ModalListItem>
            <Button
              btnRole="astext danger btnBlock"
              onClick={removeCurrentPhoto}
            >
              Remove Current Photo
            </Button>
          </ModalListItem>
          <ModalListItem>
            <Button btnRole="astext btnBlock" onClick={toggleProfilePicModal}>
              Cancel
            </Button>
          </ModalListItem>
        </ModalList>
      </Modal>
      )}
    </>
  );
};

ProfilePicChanger.propTypes = {
  authenticatedUsername: PropTypes.string.isRequired,
  searchedUserLoading: PropTypes.bool.isRequired,
  searchedUser: PropTypes.shape(searchedUserPropType).isRequired
};

export default ProfilePicChanger;
