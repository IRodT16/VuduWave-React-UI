import React from 'react';
import { useState } from 'react';

import styled from 'styled-components';
import { IoSaveOutline } from 'react-icons/io5';

import styles from './NewRaceForm.module.css';

const NewRaceForm = (props) => {
  const [raceName, setRaceName] = useState({
    eventName: '',
    eventDate: '',
  });

  const Icon = styled(IoSaveOutline)`
    transform: scale(1.2);
    margin: 0;
    vertical-align: middle;
    // margin-right: 2.4rem;
    color: #e7f5ff;
    padding: auto;
    margin-right: 1rem;
  `;

  const handleEventName = (e) => {
    // const fieldName = event.target.getAttribute('name');
    // const fieldValue = event.target.value;

    // const newFormData = {
    //   ...addFormData,
    //   class: classTest,
    //   group: groupTest,
    //   id: nanoid(),
    // };
    // console.log(newFormData);
    // newFormData[fieldName] = fieldValue;

    // setAdFormData(newFormData);

    e.preventDefault();

    const fieldName = e.target.getAttribute('name');
    const eventFieldValue = e.target.value;

    console.log(eventFieldValue);
    console.log(fieldName);

    const newData = { ...raceName };
    newData[fieldName] = eventFieldValue;
    console.log(newData);

    setRaceName(newData);

    props.onSetName(raceName);

    // props.onSetName(eventFieldValue);
  };

  const handleEventNameSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <form onSubmit={handleEventNameSubmit} className={styles.newrace}>
        <label className={styles.items}>
          Event Name
          <input
            placeholder="ex.. January Club Race"
            className={styles.inputbox}
            type="text"
            name="eventName"
            onChange={handleEventName}
          />
        </label>
        <label className={styles.items}>
          Event Date
          <input
            className={styles.inputbox}
            type="date"
            name="eventDate"
            onChange={handleEventName}
          />
        </label>

        <button onClick={props.onFormRender} className={styles.btn}>
          Create Race
        </button>
      </form>
    </section>
  );
};

export default NewRaceForm;
