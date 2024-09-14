import React from "react";
import FirstPage from "./Components/FirstPage/FirstPage";
import Registration from "./Components/RegistrationLogin/Registration";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/RegistrationLogin/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={FirstPage} />
        <Route path="/login" Component={Login} />
        <Route path="/registration" Component={Registration} />
      </Routes>
    </>
  );
}

export default App;
