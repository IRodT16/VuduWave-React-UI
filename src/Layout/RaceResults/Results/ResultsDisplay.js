import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TiDeleteOutline } from 'react-icons/ti';
import styles from './ResultsDisplay.module.css';

const Delete = styled(TiDeleteOutline)`
  // color: #ffc9c9;

  transform: scale(1.5);
  margin: 0;
  vertical-align: middle;
  margin-right: 2.4rem;
  color: #ffa8a8;
  &:hover {
    color: #e03131;
  }
`;

let deletedResults = '';

const ResultsDisplay = (props) => {
  const apiData = props.api;

  const deleteHandler = (rowId) => {
    const index = apiData.findIndex((data) => data.racer_id === rowId);

    if (window.confirm('Are you sure you want to delete?') == true) {
      const fetchData = async () => {
        const response = await fetch('/api/remove_racer_time', {
          method: 'POST',
          body: JSON.stringify({
            racer_id: +rowId,
          }),
          headers: { 'Content-Type': 'application/json' },

          credentials: 'include',
        });

        deletedResults = await response.json();
        props.handleChildData(deletedResults);
      };
      fetchData();
    } else {
      return;
    }
  };

  return (
    <div className={styles.results}>
      <table>
        <thead>
          <tr>
            {/* <Delete /> */}
            <span></span>
            <th>Place</th>
            <th>Group</th>
            <th>Boat</th>
            <th>Helm</th>
            <th>Class</th>
            <th>Sail</th>
            <th>USPN</th>
            <th>Elapsed</th>
            <th>Corrected</th>
            <th>BCE</th>
            <th>BCR</th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((results) => (
            <tr>
              <Delete onClick={() => deleteHandler(results.racer_id)} />
              <td>{results.place}</td>
              <td>{results.group}</td>
              <td>{results.boat_name}</td>
              <td>{results.helm}</td>
              <td>{results.boat_class}</td>
              <td>{results.sail_number}</td>
              <td>{results.dpn}</td>
              <td>{results.elapsed}</td>
              <td>{results.handicapped}</td>
              <td>{results.bce}</td>
              <td>{results.bcr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsDisplay;

{
  /* <label className={styles.result}>
        
        <span>Dummy Scores - 10203 - Multi - VUduBoat - Jimmy Goempal</span>
      </label>
      <label className={styles.result}>
        <Delete />
        <span>Dummy Scores - 10203 - Multi - VUduBoat - Jimmy Goempal</span>
      </label>
      <label className={styles.result}>
        <Delete />
        <span>Dummy Scores - 10203 - Multi - VUduBoat - Jimmy Goempal</span>
      </label>
      <label className={styles.result}>
        <Delete />
        <span>Dummy Scores - 10203 - Multi - VUduBoat - Jimmy Goempal</span>
      </label>
      <label className={styles.result}>
        <Delete />
        <span>Dummy Scores - 10203 - Multi - VUduBoat - Jimmy Goempal</span>
      </label>
      <label className={styles.result}>
        <Delete />
        <span>Dummy Scores - 10203 - Multi - VUduBoat - Jimmy Goempal</span>
      </label>
      <label className={styles.result}>
        <Delete />
        <span>Dummy Scores - 10203 - Multi - VUduBoat - Jimmy Goempal</span>
      </label>
      <label className={styles.result}>
        <Delete />
        <span>Dummy Scores - 10203 - Multi - VUduBoat - Jimmy Goempal</span>
      </label> */
}
