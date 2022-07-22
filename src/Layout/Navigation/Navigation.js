import React from 'react';
import { propTypes } from 'redux-form';

import Button from '../../Reusable/Button';
import styles from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <div className={styles.nav}>
      <h1 className={styles.logo}>
        <span>VUDU</span>
        <span>wave</span>
      </h1>
      <div className={styles.subnav}>
        <h2 className={styles.sub}>Welcome</h2>
        <button
          className={styles.btn}
          onClick={props.onLoggingOut}
          label="Logout"
        >
          logout
        </button>
        {/* <button>Logout</button> */}
      </div>
    </div>
  );
};

export default Navigation;
