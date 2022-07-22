import React from 'react';

import LoginAuth from './LoginAuth';
import Welcome from './Welcome';

import styles from './Login.module.css';

const Login = (props) => {
  return (
    <div className={styles.home}>
      <Welcome />
      <LoginAuth onLoggingIn={props.onLogin} />;
    </div>
  );
};

export default Login;
