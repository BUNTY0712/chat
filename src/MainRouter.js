// MainRouter.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import DashBoard from "./Page/DashBoard";
import LoginForm from "./Form/LoginForm";
import { useRequireAuth, AdminRequireAuth } from "./auth";
import RegisterForm from "./Form/RegisterForm";
import AdminPage from "./Page/AdminPage";
import AdminEditPage from "./Page/AdminEditPage";
import AdminLogin from "./Form/AdminLogin";
import DragTry from "./Page/DragTry";
import Toggle from "./Page/Try/Toggle";
// import Scrolll from "./Page/Try/Scrolll";
import ImageUpload from "./Page/Try/ImageUpload";
import Self from "./Page/Self";
import UserEdit from "./Page/UserEdit";
import Forget from "./Form/Forget";
import AdminChangePassword from "./Form/AdminChangePassword";
import LandingPage from "./Page/LandingPage";
import PasswordChange from "./Page/PasswordChange";
import { useMediaQuery } from "@mui/system";
import MobDashboard from "./Mobile/MobDashboard";
import LinkWhatsapp from "./Page/Try/LinkWhatsapp";

const PrivateRoute = ({ element, ...props }) => {
  const isAuthenticated = useRequireAuth();

  return isAuthenticated ? (
    React.cloneElement(element, { ...props }) // Pass the props to the element
  ) : (
    <Navigate to="/" replace />
  );
};

const AdminRoute = ({ element, ...props }) => {
  const isAdmin = AdminRequireAuth();

  return isAdmin ? (
    React.cloneElement(element, { ...props }) // Pass the props to the element
  ) : (
    <Navigate to="/" replace />
  );
};

const MainRouter = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  return (
    <Router basename="/chat">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        {/* DashBoard */}
        <Route
          path="/user/:idss"
          element={
            <PrivateRoute
              element={isSmallScreen ? <MobDashboard /> : <DashBoard />}
            />
          }
        />

        <Route path="/password-change" element={<PasswordChange />} />
        <Route path="/group/:idss" element={<DashBoard />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/adminedit" element={<AdminEditPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/changePassword" element={<AdminChangePassword />} />
        {/* <Route path="/" element={<ImageUpload />} /> */}
        <Route path="/dragtry" element={<DragTry />} />
        <Route path="/toggle" element={<Toggle />} />
        {/* <Route path="/scroll" element={<Scrolll />} /> */}
        <Route path="/self" element={<Self />} />
        <Route path="/admin" element={<AdminRoute element={<AdminPage />} />} />
        <Route path="/useredit" element={<UserEdit />} />
        <Route path="/forget" element={<Forget />} />
        {/* <Route path="/dashboard" element={<DashBoard />} /> */}
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<LandingPage />} />}
        />
        <Route
          path="/moblandingpage"
          element={<PrivateRoute element={<MobDashboard />} />}
        />
        {/* 
        <Route
          path="/dashboard"
         
          element={<PrivateRoute element={<DashBoard />} />}
        /> */}

        <Route path="/linkwhatsapp" element={<LinkWhatsapp />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
