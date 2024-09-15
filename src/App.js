import React, { useState } from "react";
import FirstPage from "./Components/FirstPage/FirstPage";
import Registration from "./Components/RegistrationLogin/Registration";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/RegistrationLogin/Login";

function App() {
  const [isLogin, SetIsLogin] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/" Component={() => <FirstPage isLogin={isLogin} />} />
        <Route
          path="/login"
          Component={() => <Login SetIsLogin={SetIsLogin} />}
        />
        <Route path="/registration" Component={Registration} />
      </Routes>
    </>
  );
}

export default App;
