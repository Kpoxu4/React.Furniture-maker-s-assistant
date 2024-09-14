import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./registration.module.css";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  username: Yup.string().required("Обязательное поле"),  
  password: Yup.string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Обязательное поле"),
});

// Сдесь будет запрос на сервер и дальнейшее сохраннение базы данных
const Login = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className={styles.conteiner}>
      <Logo />
      <Formik
        initialValues={{
          username: "",          
          password: "",          
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
          </div>
          <div className={styles.submitWrapper}>
            <Button type="submit">Войти</Button>
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

export default Login;
