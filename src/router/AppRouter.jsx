import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import NavigatorInitializer from "../components/navigation/NavigatorInitializer";
import UserList from "../pages/Users/UserList";
import UserDetail from "../pages/Users/UserDetail";
import UserUpdate from "../pages/Users/UserUpdate";
import ValidationList from "../pages/Validations/ValidationList";
import ValidationDetail from "../pages/Validations/ValidationDetail";
import AdviceCreate from "../pages/Advices/AdviceCreate";
import AdviceList from "../pages/Advices/AdviceList";
import AdviceDetail from "../pages/Advices/AdviceDetail";
import ActivateAccount from "../pages/Auth/ActivateAccount";
const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* initialisation des ces paths afin de les utilisés dans les différentes pages */}
      <NavigatorInitializer />

      {/* declaration de path de chaque page  */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activateAccount" element={<ActivateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/userDetail" element={<UserDetail />} />
        <Route path="/userUpdate" element={<UserUpdate />} />
        <Route path="/validationList" element={<ValidationList />} />
        <Route path="/validationDetail" element={<ValidationDetail />} />
        <Route path="/adviceCreate" element={<AdviceCreate />} />
        <Route path="/adviceList" element={<AdviceList />} />
        <Route path="/adviceDetail" element={<AdviceDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
