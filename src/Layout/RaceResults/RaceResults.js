import React from 'react';
import { useState, useRef, forwardRef } from 'react';

import QuickResultsForm from './Entry/QuickResultsForm';
import ResultsMainMenu from './Entry/ResultsMainMenu';

import styles from './RaceResults.module.css';

import ResultsDisplay from './Results/ResultsDisplay';

import CompModal from './Entry/CompModal';
import ClassModal from './Entry/ClassModal';

const RaceResults = (props) => {
  const initData = [];
  // const eventName = props.onName;
  // console.log(eventName);

  const [raceResults, setRaceResults] = useState(initData);
  const [competitorModal, setCompetitorModal] = useState(false);
  const [classModal, setClassModal] = useState(false);

  const handleChildData = (childData) => {
    const testData = [...raceResults, childData];

    setRaceResults(childData);
    console.log(childData);

    console.log(raceResults);
  };

  const deleteStateHandler = (liftedResults) => {
    setRaceResults(liftedResults);
  };

  const competitorModalHandler = () => {
    setCompetitorModal((prevState) => !prevState);
  };

  const classModalHandler = () => {
    setClassModal((prevState) => !prevState);
  };

  const fetchData = async () => {
    await fetch('/api/results', {
      method: 'GET',

      headers: { 'Content-Type': 'application/json' },

      credentials: 'include',
    })
      .then((res) => res.json())
      .then((clearResults) => {
        setRaceResults(clearResults);
        console.log(clearResults);
      });
  };

  const clearRaceHandler = async () => {
    await fetch('/api/clear_results', {
      method: 'POST',
    });
    if (window.confirm('Are you sure you want to clear all results?')) {
      fetchData();
    }
  };

  return (
    <section className={styles.display}>
      <ResultsMainMenu />
      <div className={styles.entry}>
        <QuickResultsForm
          handleChildData={handleChildData}
          reRender={competitorModal}
        />
        <div className={styles.btnDivs}>
          <button onClick={clearRaceHandler} className={styles.btn}>
            <ion-icon name="trash-outline"></ion-icon>
            <span></span>
          </button>
          <button className={styles.btn} onClick={competitorModalHandler}>
            <ion-icon name="person-add-outline"></ion-icon>
            <span>New Racer</span>
          </button>
          <button className={styles.btn} onClick={classModalHandler}>
            <ion-icon name="bookmarks-outline"></ion-icon>
            <span>New Class</span>
          </button>
        </div>

        {competitorModal && (
          <CompModal
            showModal={competitorModal}
            onAddComp={handleChildData}
            onExit={competitorModalHandler}
          />
        )}
        {classModal && (
          <ClassModal
            showModal={classModal}
            onAddComp={handleChildData}
            onExit={classModalHandler}
          />
        )}
        {/* <NewCompetitor onTest={handleChildData} /> */}
      </div>

      <ResultsDisplay
        deleteProp={deleteStateHandler}
        api={raceResults}
        handleChildData={handleChildData}
      />
    </section>
  );
};

export default RaceResults;
