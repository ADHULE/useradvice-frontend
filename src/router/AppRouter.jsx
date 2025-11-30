import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import NavigatorInitializer from "../components/navigation/NavigatorInitializer";

const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* initialisation des ces paths afin de les utilisés dans les différentes pages */}
      <NavigatorInitializer />

      {/* declaration de path de chaque page  */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
