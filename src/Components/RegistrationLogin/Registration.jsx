import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from './registration.module.css'
import Logo from '../Logo/Logo'
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { registrationUrl } from "../../Endpoints/endpoints";
import axios from "axios";


const validationSchema = Yup.object({
  username: Yup.string().required("Обязательное поле"),
  phoneNumber: Yup.string()
    .matches(/^\+?\d{10,12}$/, "Неверный формат номера телефона")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Обязательное поле"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
    .required("Обязательное поле"),
});
const Registration = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();
  const handleSubmit = async (values) => {    
    try {      
      const dataToSend = {
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
        phoneNumber: values.phoneNumber,
      };
     
      const response = await axios.post(registrationUrl, dataToSend);

      if (response.status === 200) {
        setErrorMessage('')
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className={styles.conteiner}>
      <Logo />
        <h2 className={styles.errorMessage}>{errorMessage}</h2>
      <Formik
        initialValues={{
          username: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={styles.wrapper}>
            <div className={styles.wrapperInput}>
              <div className={styles.custom_input}>
                <Field
                  type="text"
                  name="username"
                  placeholder="Имя"
                  className={styles.input}
                />
              </div>
              <div className={styles.error}>
                <ErrorMessage name="username" component="div" />
              </div>
            </div>

            <div className={styles.wrapperInput}>
              <div className={styles.custom_input}>
                <Field
                  type="phoneNumber"
                  name="phoneNumber"
                  placeholder="Телефон"
                  className={styles.input}
                />
              </div>
              <div className={styles.error}>
                <ErrorMessage name="phoneNumber" component="div" />
              </div>
            </div>

            <div className={styles.wrapperInput}>
              <div className={styles.custom_input}>
                <Field
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  autoComplete="off"
                  className={styles.input}
                />
              </div>
              <div className={styles.error}>
                <ErrorMessage name="password" component="div" />
              </div>
            </div>

            <div className={styles.wrapperInput}>
              <div className={styles.custom_input}>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Повторите пароль"
                  autoComplete="off"
                  className={styles.input}
                />
              </div>
              <div className={styles.error}>
                <ErrorMessage name="confirmPassword" component="div" />
              </div>
            </div>
          </div>

          <div className={styles.submitWrapper}>
            <Button type="submit">Зарегистрироваться</Button>
          </div>
        </Form>
      </Formik>

      <Link to="/">
        <div className={styles.home}>
          <Button>На главную</Button>
        </div>
      </Link>
    </div>
  );
};

export default Registration;


