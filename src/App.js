import React, { useState, useEffect } from "react";
import FirstPage from "./Components/FirstPage/FirstPage";
import Registration from "./Components/RegistrationLogin/Registration";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/RegistrationLogin/Login";
import axios from "axios";

function App() {
  const [jwtLogin, setJwtToken] = useState('');
  const [isLogin, setIsLogin] = useState(false); // отправка с локал стороджа токина для проверки
    /* useEffect(() => {
      const serverBaseUrl = `${process.env.REACT_APP_SERVER_BASE_URL}/AuthUser/CheckAuth`;
      axios
        .get(serverBaseUrl)
        .then((response) => {
          console.log(response.data.isAuthenticated);
          SetIsLogin(response.data.isAuthenticated);
          console.log(isLogin);
        })
        .catch((error) => {
          console.error("Ошибка при проверке авторизации:", error);
        });
    }, []); */
  return (
    <>
      <Routes>
        <Route path="/" Component={() => <FirstPage isLogin={isLogin} />} />
        <Route
          path="/login"
          Component={() => <Login SetIsLogin={setJwtToken} />}
        />
        <Route path="/registration" Component={() => <Registration />} />
      </Routes>
    </>
  );
}

export default App;
