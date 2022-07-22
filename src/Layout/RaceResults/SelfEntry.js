import React, { useState, useEffect, useRef, forwardRef } from 'react';
import Select from 'react-select';

import styles from './SelfEntry.module.css';

const SelfEntry = (props) => {
  const [value, setValue] = useState({
    competitor_id: '',
  });
  const [elapsedValue, setElapsedValue] = useState('');
  const [apiData, setApiData] = useState({ elapsed_time: '', racer_id: '' });
  //   const [apiData, setApiData] = useState();
  const [nameOptions, setNameOptions] = useState();
  const [timeIsValid, setTimeIsValid] = useState(true);
  const [racerIsValid, setRacerIsValid] = useState(true);
  const [racerSelected, setRacerSelected] = useState(false);

  /// Regular Expression Validation ///
  const match1 = /^[0-5][0-9][,:.][0-5][0-9]$/; // race under 1 hour
  const match2 = /^[0-9][,:.][0-5][0-9]$/; // race under 10 minutes but why not
  const match3 = /^[0-9]+[,:.][0-5][0-9][,:.][0-5][0-9]$/; // over an hour
  const matchdnf = /[Dd][Nn][FfSs]/; // DNF / DNS

  const entry1 = match1.test(elapsedValue);
  const entry2 = match2.test(elapsedValue);
  const entry3 = match3.test(elapsedValue);
  const entry4 = matchdnf.test(elapsedValue);

  const hash = ':     ';
  let names = '';
  let results = '';

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: !racerIsValid && !racerSelected ? '#ffc9c9' : base,

      borderColor: !racerIsValid && !racerSelected ? '#e03131' : '#ced4da',
      fontSize: '1.6rem',
    }),
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/racers', {
        method: 'GET',
        headers: { Accept: 'application/json' },

        credentials: 'include',
      });
      names = await response.json();
      console.log(names);
      setNameOptions(names);
    };
    fetchData();
  }, []);

  const handleDropChange = (e) => {
    setValue({ competitor_id: e.racer_id });
    setRacerSelected(true);
  };

  const handleElapsedChange = (e) => {
    const enteredElapsed = e.target.value;
    setElapsedValue(enteredElapsed);
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();
    console.log(elapsedValue, value);

    if (entry1 || entry2 || entry3 || entry4) {
      setTimeIsValid(true);
    } else {
      setTimeIsValid(false);
    }

    if (racerSelected) {
      setRacerIsValid(true);
    } else {
      setRacerIsValid(false);
    }

    if ((entry1 || entry2 || entry3 || entry4) && racerSelected) {
      setApiData({ elapsed_time: elapsedValue, racer_id: value.competitor_id });
      setValue({
        racer_id: '',
      });
      setElapsedValue('');
      setRacerSelected(false);
    }
  };

  useEffect(() => {
    //posting data
    const fetchData = async () => {
      const response = await fetch('/api/add_scratch_time', {
        method: 'POST',
        body: JSON.stringify({
          elapsed_time: apiData.elapsed_time,
          racer_id: apiData.racer_id,
        }),
        headers: { 'Content-Type': 'application/json' },

        credentials: 'include',
      }).then((res) => {
        if (res.ok) {
          window.alert('Time accepted');
        } else {
          return;
        }
      });
    };
    fetchData();
  }, [apiData]);

  const timeInputClasses = timeIsValid ? styles.inputbox : styles.invalid;

  return (
    <div>
      <form className={styles.quick}>
        <h2>Time Entry</h2>
        <div className={styles.quickEntry}>
          <div>
            <Select
              styles={customStyles}
              placeholder={<div>Search skipper or boat...</div>}
              options={nameOptions}
              value={value.racer_id}
              type="text"
              name="racer_id"
              onChange={handleDropChange}
              getOptionLabel={(option) => [
                option.skipper,
                hash,
                option.boat_name,
                hash,
                option.boat_class,
              ]}
              getOptionValue={(option) => option.racer_id}
            />
            {!racerIsValid && (
              <p className={styles.invalidtext}>Must select a racer</p>
            )}
          </div>

          <div className={styles.elapsed}>
            <label>
              Elapsed Time
              <input
                className={timeInputClasses}
                type="text"
                name="elapsed"
                value={elapsedValue}
                placeholder="ex..01:04:25"
                onChange={handleElapsedChange}
              />
            </label>
            {!timeIsValid && (
              <p className={styles.invalidtext}>
                Enter valid format, ex: hh:mm:ss, h.mm.ss, mm.ss, DNF
              </p>
            )}
          </div>
        </div>

        <button className={styles.btnvalid} onClick={handleSubmitButton}>
          <ion-icon name="add-circle-outline"></ion-icon>Add Result
        </button>
      </form>
    </div>
  );
};

export default SelfEntry;
