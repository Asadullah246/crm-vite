import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Invoice from "./pages/Invoice";
import Payments from "./pages/Payments";
import DashboardInfo from "./pages/DashboardInfo";
import "./styles/style.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateInvoice from "./pages/CreateInvoice";
import WelcomeTemplate from "./pages/WelcomeTemplate";
import CreateWelcomeTemplate from "./pages/CreateWelcomeTemplate";

function App() {

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />}>
              {/* Nested Routes inside Dashboard */}
              <Route path="/" element={<DashboardInfo />} />
              <Route path="customer" element={<Customer />} />
              <Route path="invoice" element={<Invoice />} />
              <Route path="payments" element={<Payments />} />
              <Route path="welcome-template" element={<WelcomeTemplate />} />
              <Route path="welcome-template/create" element={<CreateWelcomeTemplate />} />
              <Route path="invoice/create" element={<CreateInvoice />} />
            </Route>
          </Routes>
        </Router>
      </div>
      <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"

       />
    </>
  );
}

export default App;
