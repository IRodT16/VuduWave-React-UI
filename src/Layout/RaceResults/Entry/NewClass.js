import React, { useEffect } from 'react';

import { useState } from 'react';

import Select from 'react-select';

import styles from './NewCompetitor.module.css';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';

const groupOptions = [
  { group_type: 'Multi', group: 'Multihull' },
  { group_type: 'Displ', group: 'Displacement' },
  { group_type: 'Plan', group: 'Planing' },
];

const Close = styled(GrClose)`
  transform: scale(1.5);
  margin: 0;
  // vertical-align: middle;
  // margin-right: 2.4rem;
  color: #adb5bd;
  padding: auto;
  margin-left: 1rem;
  cursor: pointer;
`;

const NewClass = (props) => {
  // {
  //   "dpn": 103.6,
  //   "group": "Plani",
  //   "boat_name": "American 16",
  //   "boat_class": "AM-16"
  // }

  // const [classOptions, setClassOptions] = useState({ class: '' });
  // const [groupOption, setGroupOption] = useState({
  //   group: 'e.g.: multi, displ, plan...',
  // });

  const [classApiData, setClassApiData] = useState({
    dpn: '',
    group: '',
    boat_name: '',
    boat_class: '',
  });
  const [groupType, setGroupType] = useState({ group_type: '' });
  const [boatClassName, setBoatClassName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [classRating, setClassRating] = useState('');

  const handleBoatClassNameChange = (e) => {
    const enteredClassName = e.target.value;
    setBoatClassName(enteredClassName);
    console.log(enteredClassName);
    console.log(boatClassName);
  };

  const handleClassCodeChange = (e) => {
    const enteredCode = e.target.value;
    setClassCode(enteredCode);
    console.log(classCode);
  };

  const handleClassRatingChange = (e) => {
    const enteredRating = e.target.value;
    setClassRating(enteredRating);
    console.log(classRating);
  };

  const handleDropChange = (e) => {
    setGroupType({ group_type: e.group_type });
  };

  const addClassHandler = (e) => {
    e.preventDefault();
    setClassApiData({
      dpn: classRating,
      group: groupType.group_type,
      boat_name: boatClassName,
      boat_class: classCode,
    });

    // window.alert('Class added!');
    // props.onExit();
  };

  useEffect(() => {
    const postData = async () => {
      const response = await fetch('/api/add_dpn_class', {
        method: 'POST',
        body: JSON.stringify({
          class_code: classApiData.boat_class,
          class_name: classApiData.boat_name,
          dpn: classApiData.dpn,
          group: classApiData.group,
        }),
        headers: { 'Content-Type': 'application/json' },

        credentials: 'include',
      }).then((res) => {
        if (res.ok) {
          window.alert('Class added!');
          props.onExit();
        }
      });
    };
    postData();
  }, [classApiData]);

  return (
    <section className={styles.entries}>
      <form className={styles.entry}>
        <div className={styles.header}>
          <h2 className={styles.entryBox}>New Class Entry</h2>

          <button className={styles.icon_btn} onClick={props.onExit}>
            <Close />
          </button>
        </div>

        <section className={styles.inputs}>
          <div className={styles.inputRow}>
            <label className={styles.entryBox}>
              Class Name
              <input
                className={styles.inputbox}
                type="text"
                name="class"
                value={boatClassName}
                required="required"
                placeholder="ex..Catalina 22"
                onChange={handleBoatClassNameChange}
              />
            </label>
            <label className={styles.entryBox}>
              Class Code
              <input
                className={styles.inputbox}
                type="text"
                name="code"
                required="required"
                placeholder="ex.. CAT22NS"
                value={classCode}
                onChange={handleClassCodeChange}
              />
            </label>
          </div>
          <div className={styles.inputRow}>
            <label className={styles.entryBox}>
              Class DPN
              <input
                className={styles.inputbox}
                type="text"
                name="dpn"
                placeholder="ex.. 96.3"
                value={classRating}
                onChange={handleClassRatingChange}
              />
            </label>
            <label className={styles.entryBox}>
              Group
              <Select
                // placeholder="e.g.: multi, displ, plan..."
                options={groupOptions}
                type="text"
                name="group"
                // value={groupType.group_type}
                onChange={handleDropChange}
                getOptionLabel={(option) => option.group}
                getOptionValue={(option) => option.group_type}
              />
            </label>
          </div>
        </section>
        <div className={styles.classbtn}>
          <button
            onClick={addClassHandler}
            type="submit"
            className={styles.btn}
          >
            <ion-icon name="add-circle-outline"></ion-icon>Add Result
          </button>
          <span>
            <a
              className={styles.link}
              target="_blank"
              href="https://www.ussailing.org/wp-content/uploads/2018/01/2017-Portsmouth-Precalculated-Classes.pdf"
            >
              US Sailing Portsmouth Ratings
            </a>
          </span>
        </div>
      </form>
    </section>
  );
};

export default NewClass;
