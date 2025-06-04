import React from 'react';
import styles from './SubmitButton.module.css';

const SubmitButton = ({ onClick, disabled }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      Submit Answer
    </button>
  );
};

export default SubmitButton;