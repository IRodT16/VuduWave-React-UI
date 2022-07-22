// import { nanoid } from 'nanoid';
import React from 'react';
import { useState, useEffect } from 'react';
// import ResultsDisplay from '../Results/ResultsDisplay';
import Select from 'react-select';

// import options from '../../../dummy_classes.json';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';

import styles from './NewCompetitor.module.css';

// {
//   "dpn": 103.6,
//   "group": "Plani",
//   "boat_name": "American 16",
//   "boat_class": "AM-16"
// }

const Close = styled(GrClose)`
  transform: scale(1.5);
  margin: 0;
  // vertical-align: middle;
  // margin-right: 2.4rem;
  color: #adb5bd;
  padding: auto;
  margin-left: 1rem;
`;

const NewCompetitor = (props) => {
  const [classOptions, setClassOptions] = useState({ class: '' });

  let classes = '';
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/dpn_classes', {
        method: 'GET',
        headers: { Accept: 'application/json' },

        credentials: 'include',
      });
      classes = await response.json();
      console.log(classes);
      setClassOptions(classes);
    };
    fetchData();
  }, []);

  const [racerApiData, setRacerApiData] = useState({
    skipper: '',
    sail_number: '',
    boat_name: '',
    boat_class: '',
  });
  const [classType, setClassType] = useState('');
  const [skipperName, setSkipperName] = useState('');
  const [boatName, setBoatName] = useState('');
  const [sailNumber, setSailNumber] = useState('');

  const handleSkipperNameChange = (e) => {
    const enteredSkipperName = e.target.value;
    setSkipperName(enteredSkipperName);
  };

  const handleBoatNameChange = (e) => {
    const enteredBoatName = e.target.value;
    setBoatName(enteredBoatName);
  };

  const handleSailNumberChange = (e) => {
    const enteredSailNumber = e.target.value;
    setSailNumber(enteredSailNumber);
  };

  const handleDropChange = (e) => {
    // setGroupType({ group_type: e.group_type });
    // setClassType({ class_name: e.boat_class });
    setClassType(e.boat_class);
  };

  const addRacerHandler = (e) => {
    e.preventDefault();
    setRacerApiData({
      skipper: skipperName,
      sail_number: sailNumber,
      boat_name: boatName,
      boat_class: classType,
    });

    // window.alert('Racer added!');

    // props.onExit();
  };

  useEffect(() => {
    const postData = async () => {
      const response = await fetch('/api/add_racer', {
        method: 'POST',
        body: JSON.stringify({
          skipper: racerApiData.skipper,
          boat_name: racerApiData.boat_name,
          boat_class: racerApiData.boat_class,
          sail_number: racerApiData.sail_number,
        }),
        headers: { 'Content-Type': 'application/json' },

        credentials: 'include',
      }).then((res) => {
        if (res.ok) {
          window.alert('Racer added!');
          props.onExit();
        }
      });
    };
    postData();
  }, [racerApiData]);

  /////////////////

  return (
    <section className={styles.entries}>
      <form className={styles.entry}>
        <div className={styles.header}>
          <h2 className={styles.entryBox}>New Competitor Entry</h2>

          {/* <button type="submit" className={styles.btn}>
            <ion-icon name="checkmark-done-outline"></ion-icon>Score Results
          </button> */}
          <button className={styles.icon_btn} onClick={props.onExit}>
            <Close />
          </button>
        </div>

        <section className={styles.inputs}>
          <div className={styles.inputRow}>
            <label className={styles.entryBox}>
              Skipper's Name
              <input
                className={styles.inputbox}
                type="text"
                name="helm"
                required="required"
                placeholder="ex.. Runway Jack"
                onChange={handleSkipperNameChange}
              />
            </label>
            <label className={styles.entryBox}>
              Boat Name
              <input
                className={styles.inputbox}
                type="text"
                name="boat"
                required="required"
                placeholder="ex.. Titanic"
                onChange={handleBoatNameChange}
              />
            </label>
          </div>
          <div className={styles.inputRow}>
            <label className={styles.entryBox}>
              Sail Number
              <input
                className={styles.inputbox}
                type="text"
                name="sail"
                placeholder="optional"
                onChange={handleSailNumberChange}
              />
            </label>
            <label className={styles.entryBox}>
              Class Name
              <Select
                options={classOptions}
                onChange={handleDropChange}
                type="text"
                name="class"
                getOptionLabel={(option) => option.boat_name}
                getOptionValue={(option) => option.dpn}
              />
            </label>
          </div>
          <button
            onClick={addRacerHandler}
            type="submit"
            className={styles.btn}
          >
            Add Racer
            {/* <ion-icon name="add-circle-outline"></ion-icon>Add Racer */}
          </button>
        </section>
      </form>
    </section>
  );
};

export default NewCompetitor;
