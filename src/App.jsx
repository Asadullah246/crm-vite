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
import EditTemplate from "./pages/EditTemplate";
import UploadCustomer from "./pages/Test";
import SignUp from "./pages/SignUp";
import SignaturePage from "./pages/Signature";
import Profile from "./pages/Profile";
import ProductService from "./pages/ProductService";
import UpdatePayment from "./pages/UpdatedPayment";
// import UploadCustomer from "./pages/UploadCustomer";

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
              <Route path="product" element={<ProductService />} />
              <Route path="invoice" element={<Invoice />} />
              <Route path="payments" element={<Payments />} />
              <Route path="Signature" element={<SignaturePage />} />
              <Route path="Profile" element={<Profile />} />
              <Route path="Template" element={<WelcomeTemplate />} />
              <Route path="Template/create" element={<CreateWelcomeTemplate />} />
              <Route path="invoice/create" element={<CreateInvoice />} />
              <Route path="template/edit/:id" element={<EditTemplate />} />
              <Route path="customer/:id" element={<UpdatePayment />} />
              <Route path="upload-customer" element={<UploadCustomer />} />
            </Route>

            <Route path="/signup" element={<SignUp />} />

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
