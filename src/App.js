import React, { useState, useEffect } from "react";
import FirstPage from "./Components/FirstPage/FirstPage";
import Registration from "./Components/RegistrationLogin/Registration";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/RegistrationLogin/Login";
import Cookies from "js-cookie";

function App() {
  const [jwtToken, setJwtToken] = useState(
    Cookies.get("token") || "");
  const [isLogin, setIsLogin] = useState(false); 

    useEffect(() => {
      if(jwtToken !== ""){
        setIsLogin(true)
      }    
    }, [jwtToken]);
    
  return (
    <>
      <Routes>
        <Route
          path="/"
          Component={() => (
            <FirstPage isLogin={isLogin} setIsLogin={setIsLogin} />
          )}
        />
        <Route
          path="/login"
          Component={() => <Login setJwtToken={setJwtToken} />}
        />
        <Route path="/registration" Component={() => <Registration />} />
      </Routes>
    </>
  );
}

export default App;
