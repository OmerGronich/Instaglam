import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styles from 'components/SearchInput/SearchInput.module.scss';
import { searchUser } from 'actions/users';
import Popover from 'components/Popover/Popover';
import PopoverList from 'components/Popover/PopoverList';
import PopoverListItem from 'components/Popover/PopoverListItem';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import Spinner from 'assets/img/spinner.gif';
import { TiDelete } from 'react-icons/ti';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchInput = () => {
  const [value, setValue] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { users, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (val) => {
    if (!val) {
      setIsPopoverOpen(false);
    } else {
      setIsPopoverOpen(true);
    }
    setValue(val);
    dispatch(searchUser(val));
  };

  const handleMouseDown = (user) => {
    setValue('');
    history.push(`/${user.username}`);
  };

  return (
    <div className={styles.searchInputContainer}>
      <Popover isPopoverOpen={isPopoverOpen}>
        {(!users.length || error) && !loading ? (
          <PopoverListItem style={{ justifyContent: 'center' }}>
            <span className={styles.notFound}>{error}</span>
          </PopoverListItem>
        ) : (
          <PopoverList>
            {users.map((user) => (
              <PopoverListItem key={user.created}>
                {loading ? (
                  <img
                    src={Spinner}
                    alt="spinner"
                    style={{ width: '30px', height: '30px' }}
                  />
                ) : (
                  <Link
                    to={`/${user.username}`}
                    onMouseDown={() => handleMouseDown(user)}
                    style={{ cursor: 'pointer', width: '100%' }}
                  >
                    <ProfilePic
                      url={user.profilePic}
                      style={{ position: 'static' }}
                    />
                    <span>{user.username}</span>
                  </Link>
                )}
              </PopoverListItem>
            ))}
          </PopoverList>
        )}
      </Popover>
      <input
        id="searchInput"
        className={`${styles.SearchInput}`}
        type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        required
        onFocus={() => value && setIsPopoverOpen(true)}
        onBlur={() => setIsPopoverOpen(false)}
      />
      <label htmlFor="searchInput" className={styles.searchLabel}>
        <div>
          <AiOutlineSearch className={styles.searchIcon} />
          <span className={styles.searchText}>{!value ? 'Search' : value}</span>
        </div>
      </label>
      <button
        className={styles.deleteIconWrapper}
        type="button"
        onMouseDown={() => {
          setIsPopoverOpen(false);
          setValue('');
        }}
      >
        {loading ? (
          <img
            src={Spinner}
            alt="spinner"
            style={{ width: '10px', height: '10px' }}
          />
        ) : (
          <TiDelete className={styles.deleteIcon} />
        )}
      </button>
    </div>
  );
};

export default SearchInput;
