import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoSaveOutline } from 'react-icons/io5';
import Select from 'react-select';
import styles from './ResultsMainMenu.module.css';

const raceOptions = [{ option: 'Rum Race' }, { option: 'Jameson Race' }];

const Icon = styled(IoSaveOutline)`
  transform: scale(1.2);
  margin: 0;
  vertical-align: middle;
  // margin-right: 2.4rem;
  color: #e7f5ff;
  padding: auto;
  margin-right: 1rem;
`;

const ResultsMainMenu = (props) => {
  const [eventType, setEventType] = useState();
  const [eventDate, setEventDate] = useState();

  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: '20rem',
      fontSize: '1.6rem',
    }),
  };

  const pdfHandler = () => {
    window.open(
      `http://localhost:5000//api/pdf_results?event_type=${encodeURIComponent(
        eventType
      )}&event_date=${encodeURIComponent(eventDate)}`
    );
  };

  const handleRaceSelection = (e) => {
    setEventType(e.option);
  };

  const handleDateSelection = (e) => {
    setEventDate(e.target.value);
  };

  return (
    <section className={styles.menu}>
      {/* <h1 className={styles.eventName}>
        {/* {eventName.eventName} */}
      {/* {eventName.eventDate}
      </h1>  */}
      <form className={styles.formitems}>
        <label className={styles.entryBox}>
          Event Type
          <Select
            styles={customStyles}
            options={raceOptions}
            onChange={handleRaceSelection}
            type="text"
            name="group"
            // onChange={handleDropChange}
            getOptionLabel={(option) => option.option}
            getOptionValue={(option) => option.option}
          />
        </label>
        <label className={styles.items}>
          Event Date
          <input
            className={styles.inputbox}
            type="date"
            name="eventDate"
            onChange={handleDateSelection}
          />
        </label>
      </form>

      <div className={styles.btndiv}>
        {/* <button className={styles.btn}>
          <Icon />
          <span>Save Race</span>
        </button> */}
        <button className={styles.btn} onClick={pdfHandler}>
          Create PDF
        </button>
      </div>
    </section>
  );
};

export default ResultsMainMenu;
