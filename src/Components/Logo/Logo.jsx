import React from 'react';
import styles from './logo.module.css';

const Logo = () => {

  const imageUrl = `${process.env.PUBLIC_URL}/images/logo.png`;
  return (        
    <img className={styles.logo} src={imageUrl} alt="Logo" />    
  );
  
}

export default Logo