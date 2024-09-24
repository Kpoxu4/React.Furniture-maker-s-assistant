import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import stylesInput from "../RegistrationLogin/registration.module.css";
import styles from "./createNewOrder.module.css";


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
  orderEndTime: Yup.string()
    .required("Обязательное поле")
    .matches(/^\d+$/, "Только числами"),
});

const СreateNewOrder = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const imageUrl = `${process.env.PUBLIC_URL}/images/logo.png`; 

  const handleSubmit = async (values) => {       
    try {      
      const dataToSend = {
        firstLastName: values.firstLastName,
        address: values.address,
        phone: values.phone,
        productName: values.productName,
        productPrice: values.productPrice,
        advancePayment: values.advancePayment,
        orderEndTime: values.orderEndTime,
      };
     
      const response = await axios.post("/end point server", dataToSend);

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

            <div className={stylesInput.wrapperInput}>
              <div className={stylesInput.custom_input}>
                <Field
                  type="phoneNumber"
                  name="phone"
                  placeholder="телефон"
                  className={stylesInput.input}
                />
              </div>
              <div className={stylesInput.error}>
                <ErrorMessage name="phone" component="div" />
              </div>
            </div>

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
                <ErrorMessage name="Предоплата" component="div" />
              </div>
            </div>

            <div className={stylesInput.wrapperInput}>
              <div className={stylesInput.custom_input}>
                <Field
                  type="number"
                  name="productionTime"
                  placeholder="то 1 до 12 недель"
                  className={stylesInput.input}
                />
              </div>
              <div className={stylesInput.error}>
                <ErrorMessage name="productionTime" component="div" />
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default СreateNewOrder;

