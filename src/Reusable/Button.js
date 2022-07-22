import React from 'react';

import styles from './Button.module.css';

const Button = (props) => {
  const btnHandler = (props) => {};

  return (
    <button className={styles.btn} onClick={btnHandler}>
      {props.icon}
      {props.label}
    </button>
  );
};

export default Button;
