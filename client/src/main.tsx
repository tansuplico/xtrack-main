import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import Login from "./auth/forms/Login.tsx";
import Signup from "./auth/forms/Signup.tsx";
import AuthLayout from "./auth/AuthLayout.tsx";
import MainLayout from "./main/MainLayout.tsx";
import Dashboard from "./main/pages/Dashboard.tsx";
import Categories from "./main/pages/Categories.tsx";
import Transactions from "./main/pages/Transactions.tsx";
import Settings from "./main/pages/Settings.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./auth/AuthProvider.tsx";
import { WalletProvider } from "./lib/context/useWalletProvider.tsx";
import OTPInput from "./auth/forms/OTPInput.tsx";
import Reset from "./auth/forms/Reset.tsx";
import PrivateRoute from "./auth/PrivateRoute.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          <WalletProvider>
            <Routes>
              {/* Auth */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/otp"
                  element={
                    <PrivateRoute>
                      <OTPInput />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/reset"
                  element={
                    <PrivateRoute>
                      <Reset />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route index element={<App />} />
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Routes>
          </WalletProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
