/**
 * AppRouter.jsx
 * Main routing configuration for the application.
 * Defines all routes and their corresponding page components.
 *
 * Routes include:
 * - Public: Home, Login, Signup, Account Activation
 * - User: User list/detail/update, Advice management, Reviews
 * - Admin: Dashboard, Reviews, Users, Stats, Settings
 */

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
import ResendActivationCode from "../pages/Auth/ResendActivationCode";
import CreateReviewPage from "../pages/Advices/CreateReviewPage";
import MyAdvices from "../pages/Advices/MyAdvices";
import AdminDashboard from "../pages/Admin/AdminDashboard";

import Reviews from "../pages/Admin/Reviews";
import Stats from "../pages/Admin/Stats";
import Settings from "../pages/Admin/Settings";
import UsersManagement from "../pages/Admin/UsersManagement";

/**
 * Main router component that defines all application routes.
 * @returns {React.ReactElement} BrowserRouter with all routes configured
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavigatorInitializer />

      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/activateAccount" element={<ActivateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/reSendActivationCode"
          element={<ResendActivationCode />}
        />

        {/* ===== USER ROUTES ===== */}
        <Route path="/userList" element={<UserList />} />
        <Route path="/userDetail" element={<UserDetail />} />
        <Route path="/userUpdate" element={<UserUpdate />} />

        <Route path="/validationList" element={<ValidationList />} />
        <Route path="/validationDetail" element={<ValidationDetail />} />

        <Route path="/adviceCreate" element={<AdviceCreate />} />
        <Route path="/adviceList" element={<AdviceList />} />
        <Route path="/adviceDetail" element={<AdviceDetail />} />
        <Route path="/createReviewPage" element={<CreateReviewPage />} />
        <Route path="/myAdvices" element={<MyAdvices />} />

        {/* ===== ADMIN ROUTES ===== */}
        <Route path="/adminDashBoard" element={<AdminDashboard />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/usersManagement" element={<UsersManagement />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
