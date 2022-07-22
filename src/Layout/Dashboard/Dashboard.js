import React from 'react';
import styled from 'styled-components';

import Navigation from '../Navigation/Navigation';

import {
  IoAddSharp,
  IoBookmarksOutline,
  IoCloudOutline,
  IoPersonAddOutline,
  IoHomeOutline,
} from 'react-icons/io5';

import styles from './Dashboard.module.css';

const Add = styled(IoAddSharp)`
  transform: scale(1.5);
  margin: 0;
  // vertical-align: middle;
  // margin-right: 2.4rem;
  color: #adb5bd;
  &:hover {
    color: #4dabf7;
  }

  margin-left: 1rem;
`;

const Home = styled(IoHomeOutline)`
  transform: scale(1.5);
  margin: 0;
  // vertical-align: middle;
  // margin-right: 2.4rem;
  color: #adb5bd;
  &:hover {
    color: #4dabf7;
  }

  margin-left: 1rem;
`;

const Class = styled(IoBookmarksOutline)`
  transform: scale(1.5);
  margin: 0;
  // vertical-align: middle;
  // margin-right: 2.4rem;
  color: #adb5bd;
  padding: auto;
  margin-left: 1rem;
`;

const Archive = styled(IoCloudOutline)`
  transform: scale(1.5);
  margin: 0;
  // vertical-align: middle;
  // margin-right: 2.4rem;
  color: #adb5bd;
  padding: auto;
  margin-left: 1rem;
`;

const User = styled(IoPersonAddOutline)`
  transform: scale(1.5);
  margin: 0;
  // vertical-align: middle;
  // margin-right: 2.4rem;
  color: #adb5bd;
  padding: auto;
  margin-left: 1rem;
`;

const Dashboard = (props) => {
  return (
    <section className={styles.dash}>
      <Navigation onLoggingOut={props.onLogout} />
      {/* <h2 className={styles.sub}>Dashboard</h2> */}

      <div className={styles.btnsection}>
        <button onClick={props.onHome} className={styles.btn}>
          <Home />
          <span>Home</span>
        </button>

        <button onClick={props.onNewRace} className={styles.btn}>
          <Add />
          <span>Results</span>
        </button>

        {/* <button className={styles.btn}>
          <Archive />
          <span>Archive</span>
        </button> */}
      </div>
    </section>
  );
};

export default Dashboard;
