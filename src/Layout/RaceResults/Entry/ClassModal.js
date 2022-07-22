import React from 'react';
import ReactDOM from 'react-dom';

import NewClass from './NewClass';

import styles from './Modal.module.css';

const ClassModal = (props) => {
  const test = (
    <section className={styles.wrapper}>
      <NewClass onAddComp={props.onAddComp} onExit={props.onExit} />
    </section>
  );

  return ReactDOM.createPortal(test, document.querySelector('#classModal'));
};

export default ClassModal;
