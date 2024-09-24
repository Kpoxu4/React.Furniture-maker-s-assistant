import React, { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import Button from '../Button/Button'
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./firstPage.module.css";
import Logo from "../Logo/Logo"

const FirstPageIsLogin = ({setIsLogin}) => {
  const [name, setName] = useState("");
  const token = Cookies.get("token");

  useEffect(() => {
    try {
      if (token) {
        const decoded = jwtDecode(token);
        setName(decoded.name);
      }
    } catch (error) {
      console.error("Ошибка при декодировании токена", error);
    }
  }, [token]);

  const handleLinkClick = useCallback(() => {   
    setIsLogin(false);
    Cookies.remove("token");
  }, [setIsLogin]);

  return (
    <div className={`${styles.wrapperIsLogin} ${styles.wrapper}`}>
      <Logo></Logo>
      <h1 className={`${styles.titleIslogin} ${styles.title}`}>
        Добро пожаловать, {name}
      </h1>
      <Link to="/createNewOrder">
        <Button>Создать новый заказ</Button>
      </Link>
      <Link to="/viewAllOrders">
        <Button>Посмотреть все заказы</Button>
      </Link>
      <Link to="/viewCompletedOrders">
        <Button>Посмотреть выполненые заказы</Button>
      </Link>
      <Link to="/viewOutstandingOrders">
        <Button>Посмотреть не выполненые заказы</Button>
      </Link>
      <Link to="/" onClick={handleLinkClick}>
        <Button>Выйти с профиля</Button>
      </Link>
    </div>
  );
};

export default FirstPageIsLogin

