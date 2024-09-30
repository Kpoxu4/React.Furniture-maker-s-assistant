import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import stylesInput from "../RegistrationLogin/registration.module.css";
import styles from "./createNewOrder.module.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button"
import { createOrder } from "../../Endpoints/endpoints";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";


const validationSchema = Yup.object({
  firstLastName: Yup.string().required("Обязательное поле"),
  address: Yup.string().required("Обязательное поле"),
  phone: Yup.string()
    .required("Обязательное поле")
    .matches(/^\+?\d{10,12}$/, "Неверный формат номера телефона"),
  productName: Yup.string().required("Обязательное поле"),
  productPrice: Yup.string()
    .required("Обязательное поле")
    .matches(/^\d+$/, "Цену только числами"),
  advancePayment: Yup.string()
    .required("Обязательное поле")
    .matches(/^\d+$/, "Только числами"),
  productionTime: Yup.string()
    .required("Обязательное поле")
    .matches(/^\d+$/, "Только числами"),
});


const СreateNewOrder = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState("");
  const imageUrl = `${process.env.PUBLIC_URL}/images/logo.png`; 

  useEffect(() => {
    const token = Cookies.get("token");
    const decodToken = jwtDecode(token);
    const userId = decodToken.id;
    setUserId(userId);
  }, []);

  const handleSubmit = async (values) => {   
    try {      
      const dataToSend = {
        firstLastName: values.firstLastName,
        address: values.address,
        phone: values.phone,
        productName: values.productName,
        productPrice: values.productPrice,
        advancePayment: values.advancePayment,
        productionTime: values.productionTime,
        userId: userId,
      };

      const response = await axios.post(createOrder, dataToSend);
      
      console.log(dataToSend);

      if (response.status === 200) {
        setErrorMessage('')       
      }
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div
      className={styles.formWrapper}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <h2 className={stylesInput.errorMessage}>{errorMessage}</h2>
      <Formik
        initialValues={{
          firstLastName: "",
          address: "",
          phone: "",
          productName: "",
          productPrice: "",
          advancePayment: "",
          productionTime: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <div className={`${stylesInput.wrapper} ${styles.anotherClass}`}>
            {/* name */}
            <div className={stylesInput.wrapperInput}>
              <div className={stylesInput.custom_input}>
                <Field
                  type="text"
                  name="firstLastName"
                  placeholder="Имя Фамилия"
                  className={stylesInput.input}
                />
              </div>
              <div className={stylesInput.error}>
                <ErrorMessage name="firstLastName" component="div" />
              </div>
            </div>
            {/*adress*/}
            <div className={stylesInput.wrapperInput}>
              <div className={stylesInput.custom_input}>
                <Field
                  type="text"
                  name="address"
                  placeholder="Адрес"
                  className={stylesInput.input}
                />
              </div>
              <div className={stylesInput.error}>
                <ErrorMessage name="address" component="div" />
              </div>
            </div>
            {/*phone*/}
            <div className={stylesInput.wrapperInput}>
              <div className={stylesInput.custom_input}>
                <Field
                  type="phoneNumber"
                  name="phone"
                  placeholder="Телефон"
                  className={stylesInput.input}
                />
              </div>
              <div className={stylesInput.error}>
                <ErrorMessage name="phone" component="div" />
              </div>
            </div>
            {/*productName*/}
            <div className={stylesInput.wrapperInput}>
              <div className={stylesInput.custom_input}>
                <Field
                  type="text"
                  name="productName"
                  placeholder="Имя заказа"
                  className={stylesInput.input}
                />
              </div>
              <div className={stylesInput.error}>
                <ErrorMessage name="productName" component="div" />
              </div>
            </div>
            {/*productPrice*/}
            <div className={stylesInput.wrapperInput}>
              <div className={stylesInput.custom_input}>
                <Field
                  type="number"
                  name="productPrice"
                  placeholder="Стоимость"
                  className={stylesInput.input}
                />
              </div>
              <div className={stylesInput.error}>
                <ErrorMessage name="productPrice" component="div" />
              </div>
            </div>
            {/*advancePayment*/}
            <div className={stylesInput.wrapperInput}>
              <div className={stylesInput.custom_input}>
                <Field
                  type="number"
                  name="advancePayment"
                  placeholder="Предоплата"
                  className={stylesInput.input}
                />
              </div>
              <div className={stylesInput.error}>
                <ErrorMessage name="advancePayment" component="div" />
              </div>
            </div>
            {/*productionTime*/}
            <div className={stylesInput.wrapperInput}>
              <div className={stylesInput.custom_input}>
                <Field
                  type="number"
                  name="productionTime"
                  placeholder="Срок изготовления от 1 до 12 недель"
                  className={stylesInput.input}
                />
              </div>
              <div className={stylesInput.error}>
                <ErrorMessage name="productionTime" component="div" />
              </div>
            </div>
          </div>

          <div className={stylesInput.submitWrapper}>
            <Button type="submit">Создать</Button>
          </div>

          <Link to="/">
            <div
              className={stylesInput.submitWrapper}
              style={{ marginTop: "20px" }}
            >
              <Button>Назад</Button>
            </div>
          </Link>
        </Form>
      </Formik>
    </div>
  );
};

export default СreateNewOrder;

