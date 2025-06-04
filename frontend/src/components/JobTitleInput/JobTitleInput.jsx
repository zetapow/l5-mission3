import React from 'react';
import styles from './JobTitle.module.css';

const JobTitleInput = ({ jobTitle, setJobTitle, onSubmit }) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Enter job title (e.g. Frontend Developer)"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        className={styles.input}
      />
      <button onClick={onSubmit} className={styles.button}>Start Interview</button>
    </div>
  );
};

export default JobTitleInput;