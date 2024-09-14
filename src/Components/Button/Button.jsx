import React from 'react';
import styles from "./btn.module.css";

const button = ({children, type}) => {
  return (
    <button className={styles.btn} type={type}>
      {children}
    </button>
  );
}

export default button