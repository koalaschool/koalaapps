import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";

const App = () => {
  const isLoggedIn = localStorage.getItem("token"); // Check if user is logged in
  
  return (
    <Routes>
      {!isLoggedIn ? ( // Render routes for non-logged-in users
        <Route path="auth/*" element={<AuthLayout />} />
      ) : (
        <Route path="admin/*" element={<AdminLayout />} />
      )}
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/admin/default" replace /> // Redirect logged-in users to admin page
          ) : (
            <Navigate to="/auth/sign-in" replace /> // Redirect non-logged-in users to login page
          )
        }
      />
    </Routes>
  );
};

export default App;
