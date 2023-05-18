import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cek status login pada komponen ini
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = localStorage.getItem("token");
    console.log(localStorage.getItem('token'));
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    setIsLoading(false);
  };

  const renderProtectedRoute = (element) => {
    if (isLoading) {
      return <div>Loading...</div>;
    } else {
      if (isLoggedIn) {
        return element;
      } else {
        return <Navigate to="/auth/sign-in" replace />;
      }
    }
  };

  return (
    <Routes>
      <Route
        path="auth/*"
        element={<AuthLayout onLogin={checkLoginStatus} />}
      />
      <Route
        path="admin/*"
        element={renderProtectedRoute(<AdminLayout />)}
      />
      <Route path="rtl/*" element={renderProtectedRoute(<RtlLayout />)} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;
