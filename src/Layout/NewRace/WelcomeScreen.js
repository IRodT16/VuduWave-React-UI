import React from 'react';
import NewRaceForm from '../RaceResults/Entry/NewRaceForm';
import styles from './WelcomeScreen.module.css';

const WelcomeScreen = () => {
  return (
    <section className={styles.welcome}>
      <div>
        <h1 className={styles.header}>Let's get started.</h1>

        <p className={styles.caption}>Select options from the dashboard.</p>
      </div>
    </section>
  );
};

export default WelcomeScreen;

// import React from 'react';

// const NewRace = () => {
//   return (
//     <section>
//       <div>
//         <h1>Let's get started...</h1>
//         <p></p>
//       </div>
//     </section>
//   );
// };

// export default NewRace;
