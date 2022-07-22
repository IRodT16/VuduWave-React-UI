import React, { useState } from 'react';
import { useIsUserInteractionMode } from 'react-md';

import styles from './LoginAuth.module.css';

// let username = '';
// let password = '';

const LoginAuth = (props) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [passwordInfo, setPasswordInfo] = useState({ password: '' });
  const [userNameInfo, setUsernameInfo] = useState({ username: '' });

  const setState = () => props.onLoggingIn();
  let results = '';

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    setCredentials({
      username: userNameInfo.username,
      password: passwordInfo.password,
    });

    console.log(credentials);
    console.log(passwordInfo);
    console.log(userNameInfo);

    const testLoginHandler = async (props) => {
      await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          username: userNameInfo.username,
          password: passwordInfo.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.ok) {
          console.log('success');
          setState();
        } else {
          console.log('not a success');
          return;
        }
      });
    };
    testLoginHandler();
  };

  const loginAuthUsernameHandler = (e) => {
    const username = e.target.value;

    setUsernameInfo({ username: username });
  };
  const loginAuthPasswordHandler = (e) => {
    const password = e.target.value;

    setPasswordInfo({ password: password });
  };

  return (
    <div className={styles.login}>
      <form className={styles.login_form} onSubmit={loginSubmitHandler}>
        <label>
          Username
          <input
            className={styles.login_input}
            onChange={loginAuthUsernameHandler}
            type="text"
            name="username"
          ></input>
        </label>
        <label>
          Password
          <input
            className={styles.login_input}
            type="password"
            name="password"
            onChange={loginAuthPasswordHandler}
          ></input>
        </label>
        <button
          type="submit"
          // onClick={props.onLoggingIn}
          className={styles.btn}
        >
          login
        </button>
      </form>
    </div>
  );
};

export default LoginAuth;
