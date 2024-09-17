import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./registration.module.css";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUrl } from "../../Endpoints/endpoints";

const validationSchema = Yup.object({
  username: Yup.string().required("Обязательное поле"),
  password: Yup.string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Обязательное поле"),
});

const Login = ({ setJwtToken }) => {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const dataToSend = {
        username: values.username,
        password: values.password,
      };

      const response = await axios.post(loginUrl, dataToSend);

      if (response.status === 200) {
        setJwtToken(response.data.token);
        navigate("/");
      }
      else{
        navigate("/")
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
    }
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
                  autoComplete="off"
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
