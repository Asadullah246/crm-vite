import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from '@mui/material';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
// import AddNewCustomer from './AddNewCustomer';
import { getData } from '../others/api';
// import DropdownForCustomer from './DropdownForCustomer';
import {  useNavigate } from 'react-router-dom';

const TableForExcel = ({excelData, propertyNames}) => {
    return (
        <div>
              <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%", width:"100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
          {propertyNames.map((key, index) => (
                //   <th key={index}>{key}</th>
                  <TableCell key={index}  align={index==0 ? "row":"right"} >{key}</TableCell>
                ))} 

            {/* <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">phone</TableCell>
            <TableCell align="right">Postal Code</TableCell>
            <TableCell align="right">Service Type</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Payment</TableCell>
            <TableCell align="right">Manage</TableCell> */}
          </TableRow>
        </TableHead>

        <TableBody>
          {excelData?.map((row) => (
            <TableRow
              key={row?._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >


{Object.values(row).map((val, colIndex) => (
                    // <td key={colIndex}>{val}</td>
                    <TableCell key={colIndex} scope={colIndex==0 && "row"} align={colIndex==0 ? "row":"right"} component={colIndex==0 && "th"} >{val} </TableCell>
                  ))}


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </div>
    );
};

export default TableForExcel;
