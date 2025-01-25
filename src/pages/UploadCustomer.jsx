import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const UploadCustomer = () => {
  const [excelData, setExcelData] = useState([]);

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

      // Filter out any rows with all empty cells
      const cleanedData = jsonData?.filter((row) => row.some((cell) => cell !== ''));

      // Process and convert dates where applicable
      const processedData = cleanedData.map((row) =>
        row.map((cell) => (isExcelDate(cell) ? excelDateToJSDate(cell) : cell))
      );

      setExcelData(processedData);
    };

    reader.readAsArrayBuffer(file);
  };
  console.log("dta", excelData);

  return (
    <div>
      <h2>Upload and Read Customer Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      {excelData.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              {excelData[0].map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((val, colIndex) => (
                  <td key={colIndex}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UploadCustomer;
