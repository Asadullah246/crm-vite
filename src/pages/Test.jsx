import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { postData } from "../others/api";
import toastSuccess from "../component/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography } from "@mui/material";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { getData } from "../others/api";
import { useNavigate } from "react-router-dom";
import TableForExcel from "../component/TableForExcel";

const UploadCustomer = () => {
  const [excelData, setExcelData] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const navigate=useNavigate()

  // Define the manual property names for the data object
  const propertyNames = [
    "name",
    "address",
    "phone",
    "startingDate",
    "serviceType",
    "annualUpfront",
    "price",
    "welcomePackSent",
    "firstAnnualServiceDate",
    "annualServiceDueDate",
    "boilerMake",
    "assignedEng",
    "AECompanyName",
    "coverEng",
    "CECompanyName",
    "randomId",
  ];

  // Function to generate a random heating ID
  const generateHeatingId = () => {
    const randomNumber = Math.floor(Math.random() * 10000); // Generate a random number
    const heatingId = `AMSI${randomNumber}`; // Concatenate "Heating" with the random number
    return heatingId;
  };

  // Function to check if a value is an Excel serial date number
  const isExcelDate = (value) => {
    return typeof value === "number" && value > 25569; // Excel dates start from Jan 1, 1900 (serial 25569)
  };

  // Function to convert Excel serial date to JavaScript date
  const excelDateToJSDate = (serial) => {
    if (typeof serial !== "number" || serial <= 0) {
      return ""; // Return an empty string if it's not a valid serial number
    }
    const utc_days = Math.floor(serial - 25569);
    const date = new Date(utc_days * 86400 * 1000);
    if (isNaN(date.getTime())) {
      return ""; // Return an empty string if the date is invalid
    }
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Get the first sheet
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert the sheet to JSON with options to avoid hidden/empty rows
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1, // Fetch data as a 2D array
        defval: "", // Assign empty string to missing values
      });

      // Filter out any rows with all empty cells and skip the first row
      const cleanedData = jsonData
        .slice(2)
        .filter((row) => row.some((cell) => cell !== ""));

      // Map the rows to the manually defined property names
      const processedData = cleanedData.map((row) => {
        const rowData = {};
        propertyNames.slice(0, -1).forEach((prop, index) => {
          // Use the manually defined property names and map them to the row data (except randomId for now)
          rowData[prop] = isExcelDate(row[index])
            ? excelDateToJSDate(row[index])
            : row[index]?.toString().trim();
        });

        // Add the randomId field with a generated heating ID
        rowData.randomId = generateHeatingId();

        return rowData;
      });

      setExcelData(processedData);
    };

    reader.readAsArrayBuffer(file);
  };

  // Function to upload data to the backend using axios
  const uploadToBackend = async () => {
    postData("/customer/many", excelData).then((response) => {
      toastSuccess("Successfully customer created");
      console.log("post res", response);
    });
  };

  return (
    <div className="pageLayout" style={{minHeight:"90vh"}}>
      <div className="content-topbar">
        <div className="content-title">
          <ArrowBackIcon style={{cursor:"pointer" }}  onClick={() => navigate(-1)} /> 
          <Typography
            variant="h6"
            component="h6"
            style={{ fontWeight: "bold" }}
          >
            Upload Customers
          </Typography>
        </div>
        <div className="content-title">
          {/* <Input size="md" placeholder="Search" /> */}
          <Button
            size="md"
            variant={"solid"}
            color="primary"
            onClick={()=>navigate("/Customer")}
          >
            See All Customer
          </Button>

          {/* <Button size="md" variant={"solid"} color="primary"  onClick={()=>toggleDrawer("right", true)}>
            {"right"}
          </Button> */}
        </div>
      </div>
      <h3 style={{marginTop:"70px"}}>Upload Customer Data From Excel File</h3>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />


      {excelData.length > 0 && (
       <>
          <Button size="md" style={{margin:"30px 0"}} variant={"solid"} color="primary"onClick={uploadToBackend}>
          Upload
        </Button>

       <TableForExcel excelData={excelData} propertyNames={propertyNames} />

        </>
      )}
    </div>
  );
};

export default UploadCustomer;
