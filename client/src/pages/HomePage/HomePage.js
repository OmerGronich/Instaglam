import React from 'react';
import styles from 'pages/HomePage/HomePage.module.scss';
import HomePagePost from 'components/HomePagePost/HomePagePost';

const HomePage = () => (
  <div className={styles.container}>
    <HomePagePost />
  </div>
);
export default HomePage;
