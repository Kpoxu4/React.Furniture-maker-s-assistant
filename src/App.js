import React, { useState, useEffect, useCallback } from "react";
import FirstPage from "./Components/FirstPage/FirstPage";
import Registration from "./Components/RegistrationLogin/Registration";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/RegistrationLogin/Login";
import Cookies from "js-cookie";
import CreateNewOrder from './Components/CreateNewOrder/CreateNewOrder';
import ViewAllOrders from './Components/ViewAllOrders/ViewAllOrders'
import ViewCompletedOrders from './Components/ViewCompletedOrders/ViewCompletedOrders'
import ViewOutstandingOrders from './Components/ViewOutstandingOrders/ViewOutstandingOrders'
import {checkToking} from './Endpoints/endpoints'

function App() {
  const [jwtToken, setJwtToken] = useState(
    Cookies.get("token") || "");
  const [isLogin, setIsLogin] = useState(false); 

  const checkTokenValidity = useCallback(async (jwtToken) => {
    try {
    const response = await fetch(`${checkToking}?token=${jwtToken}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

      if (response.ok) {
        const data = await response.json();
        return data.valid;         
      } else {       
        return false;
      }
    } catch (error) {
      console.error("Error checking token validity:", error);
      return false;
    }
  }, []);

  useEffect(() => {
    async function checkAndSetLoginStatus() {
      if (jwtToken !== "") {
        const isValid = await checkTokenValidity(jwtToken);       
        setIsLogin(isValid);
      }
    }
    checkAndSetLoginStatus();
  }, [jwtToken, checkTokenValidity]);
    
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
        <Route 
          path="/registration" 
          Component={() => <Registration />}             
        />
        <Route 
          path="/createNewOrder" 
          Component={() => <CreateNewOrder />}
        />
        <Route 
          path="/viewAllOrders" 
          Component={() => <ViewAllOrders />} 
        />
        <Route 
          path="/viewCompletedOrders" 
          Component={() => <ViewCompletedOrders />}             
        />
        <Route 
          path="/viewOutstandingOrders" 
          Component={() => <ViewOutstandingOrders />}             
        />        
      </Routes>
    </>
  );
}

export default App;
