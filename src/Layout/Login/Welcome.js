import React from 'react';

import styles from './Welcome.module.css';

const Welcome = (props) => {
  return (
    <div className={styles.welcome}>
      <h1 className={styles.logo}>
        <span>VUDU</span>
        <span>wave</span>
      </h1>

      {/* <p>Regatta results made fast and easy</p> */}
    </div>
  );
};

export default Welcome;
