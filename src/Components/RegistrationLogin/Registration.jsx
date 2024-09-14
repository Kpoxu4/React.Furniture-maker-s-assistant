import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from './registration.module.css'
import Logo from '../Logo/Logo'
import Button from "../Button/Button";
import { Link } from "react-router-dom";


const validationSchema = Yup.object({
  userName: Yup.string().required("Обязательное поле"),
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

// Сдесь будет запрос на сервер и дальнейшее сохраннение базы данных
const Registration = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className={styles.conteiner}>
      <Logo />
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


