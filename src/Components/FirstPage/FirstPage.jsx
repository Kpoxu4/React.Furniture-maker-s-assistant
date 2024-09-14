import React from 'react'
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import styles from "./firstPage.module.css";
import { Link } from 'react-router-dom';

const FirstPage = () => {
  return (
    <div className={styles.wrapper}>
      <Logo />
      <h1 className={styles.title}>Онлайн-помощник мебельщика</h1>
      <div className={styles.wrapperBtn}>
        <Link to="/login">
          <Button>Войти</Button>
        </Link>
        <Link to="/registration">
          <Button>Зарегистрироваться</Button>
        </Link>
      </div>
    </div>
  );
}

export default FirstPage