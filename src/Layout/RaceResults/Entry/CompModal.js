import React from 'react';
import ReactDOM from 'react-dom';

import NewCompetitor from './NewCompetitor';

import styles from './Modal.module.css';

const CompModal = (props) => {
  const test = (
    <section className={styles.wrapper}>
      <NewCompetitor onAddComp={props.onAddComp} onExit={props.onExit} />
    </section>
  );

  return ReactDOM.createPortal(test, document.querySelector('#compModal'));
};

export default CompModal;

// onClick={props.onExit}
