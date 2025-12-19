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

import Stats from "../pages/Admin/Stats";

import UsersManagement from "../pages/Admin/UsersManagement";
import Analytics from "../pages/Admin/Config/Analytics";
import SystemSettings from "../pages/Admin/Config/SystemSettings";
import AdminDashboard from "../pages/Admin/Config/AdminDashboard";
import ReviewsDashboard from "../pages/Admin/Config/ ReviewsDashboard";
import Reports from "../pages/Admin/Config/Reports";

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
        <Route path="/ReviewsDashboard" element={<ReviewsDashboard />} />
        <Route path="/usersManagement" element={<UsersManagement />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/SystemSettings" element={<SystemSettings />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
