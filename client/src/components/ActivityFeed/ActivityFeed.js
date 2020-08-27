import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import { userActivitiesFeedSelector } from 'actions/activities/activitiesFeedSelectors';
import { followsSelector } from 'actions/follows/followSelectors';
import { getUserActivitiesFeed } from 'actions/activities/activitiesFeedActions';
import { getFollows } from 'actions/follows/followActions';
import Popover from 'components/Popover/Popover';
import PopoverList from 'components/Popover/PopoverList';
import PopoverListItem from 'components/Popover/PopoverListItem';
import ActivityItem from 'components/ActivityFeed/ActivityItem';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import PropTypes from 'prop-types';
import styles from './ActivityFeed.module.scss';

const structuredActivitieFeedSelector = createStructuredSelector({
  user: authenticatedUserSelector,
  userActivities: userActivitiesFeedSelector,
  follows: followsSelector
});

const ActivityFeed = ({ setIsActivityFeedOpen, setHeartIconFilled }) => {
  const [localLoading, setLocalLoading] = useState(false);
  const { user, userActivities, follows } = useSelector(structuredActivitieFeedSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserActivitiesFeed(user._id));
  }, []);

  return (
    (
      <div
        className={styles.popoverWrapper}
        onClick={() => {
        // setIsActivityFeedOpen(false);
          setHeartIconFilled(false);
        }}
      >
        <Popover
          isPopoverOpen
          style={{ top: '60px', right: '111px', width: '100%', maxWidth: '600px' }}
        >
          {localLoading ? <LoadingSpinner />
            : (
              <PopoverList>
                {
          !userActivities.length
            ? (
              <PopoverListItem>
                <span className={styles.notFound}>No activities found.</span>
              </PopoverListItem>
            )
            : userActivities.map(activity => (
              <PopoverListItem
                key={activity._id}
                style={{ textOverflow: 'initial' }}
              >
                <ActivityItem
                  activity={activity}
                />
              </PopoverListItem>
            ))
}
              </PopoverList>
            )}

        </Popover>
      </div>
    )
  );
};

ActivityFeed.propTypes = {
  isActivityFeedOpen: PropTypes.bool.isRequired,
  setIsActivityFeedOpen: PropTypes.func.isRequired,
  setHeartIconFilled: PropTypes.func.isRequired
};

export default ActivityFeed;
