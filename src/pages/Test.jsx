import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const UploadCustomer = () => {
  const [excelData, setExcelData] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');

  // Define the manual property names for the data object
  const propertyNames = [
    'name', 'address', 'contact', 'startDate', 'subscription', 'annualUpfront',
    'monthly', 'welcomePackSent', 'firstAnnualServiceDate', 'annualServiceDueDate',
    'boilerMake', 'assignedEngineers', 'companyName', 'coverEngineer', 'secondCompanyName'
  ];

  // Function to check if a value is an Excel serial date number
  const isExcelDate = (value) => {
    return typeof value === 'number' && value > 25569; // Excel dates start from Jan 1, 1900 (serial 25569)
  };

  // Function to convert Excel serial date to JavaScript date
  const excelDateToJSDate = (serial) => {
    if (typeof serial !== 'number' || serial <= 0) {
      return ''; // Return an empty string if it's not a valid serial number
    }
    const utc_days = Math.floor(serial - 25569);
    const date = new Date(utc_days * 86400 * 1000);
    if (isNaN(date.getTime())) {
      return ''; // Return an empty string if the date is invalid
    }
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
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
      const workbook = XLSX.read(data, { type: 'array' });

      // Get the first sheet
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert the sheet to JSON with options to avoid hidden/empty rows
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1, // Fetch data as a 2D array
        defval: '', // Assign empty string to missing values
      });

      // Filter out any rows with all empty cells and skip the first row
      const cleanedData = jsonData.slice(2).filter((row) => row.some((cell) => cell !== ''));

      // Map the rows to the manually defined property names
      const processedData = cleanedData.map((row) => {
        const rowData = {};
        propertyNames.forEach((prop, index) => {
          // Use the manually defined property names and map them to the row data
          rowData[prop] = isExcelDate(row[index]) ? excelDateToJSDate(row[index]) : row[index];
        });
        return rowData;
      });

      setExcelData(processedData);
    };

    reader.readAsArrayBuffer(file);
  };

  // Function to upload data to the backend using axios
  const uploadToBackend = async () => {
    console.log("data", excelData );
    // try {
    //   const response = await axios.post('http://localhost:5000/api/upload-customers', excelData);
    //   setUploadStatus('Upload successful');
    // } catch (error) {
    //   console.error('Error uploading data:', error);
    //   setUploadStatus('Upload failed');
    // }
  };

  return (
    <div>
      <h2>Upload and Read Customer Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      {excelData.length > 0 && (
        <div>
          <button onClick={uploadToBackend}>Upload to Database</button>
          {uploadStatus && <p>{uploadStatus}</p>}

          <table border="1">
            <thead>
              <tr>
                {propertyNames.map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((val, colIndex) => (
                    <td key={colIndex}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadCustomer;
