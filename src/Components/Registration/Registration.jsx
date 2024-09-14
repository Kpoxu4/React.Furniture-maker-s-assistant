import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from './registration.module.css'
import Logo from '../Logo/Logo'
import Button from "../Button/Button";
import { Link } from "react-router-dom";


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
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (     
    <div className={styles.conteiner}>
    <Logo/>
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
            <div className={styles.field}>
              <Field type="text" name="username" placeholder="Имя" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div className={styles.field}>
              <Field
                type="phoneNumber"
                name="phoneNumber"
                placeholder="Телефон"
              />
              <ErrorMessage name="phoneNumber" component="div" />
            </div>
            <div className={styles.field}>
              <Field type="password" name="password" placeholder="Пароль" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div className={styles.field}>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Повторите пароль"
              />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>
          </div>
          <Button type="submit">Отправить</Button>         
        </Form>
      </Formik>
      <Link to="/"><Button>На главную</Button></Link>
    </div>
  );
};

export default Registration;


