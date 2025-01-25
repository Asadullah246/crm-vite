// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { Typography } from '@mui/material';
// import Button from '@mui/joy/Button';
// import Input from '@mui/joy/Input';
// import AddNewCustomer from './AddNewCustomer';
// import { useNavigate } from 'react-router-dom';
// import { getData } from '../others/api';
// import DropdownForCustomer from './DropdownForCustomer';

// export default function InvoiceTable() {

//     const [state, setState] = React.useState(false);
//     const navigate = useNavigate();
//     const [data, setData] = React.useState([]);
//     const [loading, setLoading] = React.useState(false);
//     const [refresh, setRefresh] = React.useState(false);

//     // Fetch data on component mount
//     React.useEffect(() => {
//       setLoading(true);
//       getData('/invoice')
//         .then((response) => {
//           setData(response?.data);
//           setLoading(false);
//         })
//         .catch(() => setLoading(false));
//     }, [refresh]);


//     const toggleDrawer = (inOpen) => (event) => {
//         if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//           return;
//         }

//         setState(inOpen);
//       };
//     const navigateToCreate = () => {
//       navigate("/invoice/create")
//       };

//       console.log("in", data);

//   return (
//    <div>
//     <AddNewCustomer state={state} setState={setState} toggleDrawer={toggleDrawer} ></AddNewCustomer>
//     <div className='content-topbar'>
//         <div className='content-title'>
//            <ArrowBackIcon/>
//            <Typography variant="h6" component="h6" style={{fontWeight:"bold"}} >
//         Invoices
//       </Typography>
//         </div>
//         <div className='content-title'>
//         <Input size="md" placeholder="Search" />;
//         <Button size="md" variant={"solid"} color="primary" onClick={navigateToCreate}>
//           Add New Invoice
//         </Button>
//         {/* <Button size="md" variant={"solid"} color="primary"  onClick={()=>toggleDrawer("right", true)}>
//             {"right"}
//           </Button> */}
//         </div>
//     </div>
//      <TableContainer component={Paper}>
//       <Table sx={{ minWidth: "100%", width:"100%" }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Number</TableCell>
//             <TableCell align="right">Client</TableCell>
//             <TableCell align="right">Date</TableCell>
//             <TableCell align="right">Expire Date</TableCell>
//             <TableCell align="right">Total</TableCell>
//             <TableCell align="right">Paid</TableCell>
//             <TableCell align="right">Status</TableCell>
//             <TableCell align="right">Payment</TableCell>
//             <TableCell align="right">Action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data?.map((row) => (
//             <TableRow
//               key={row?.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row?.number}
//               </TableCell>
//               <TableCell align="right">{row?.client}</TableCell>
//               <TableCell align="right">{row?.date}</TableCell>
//               <TableCell align="right">{row?.expireDate}</TableCell>
//               <TableCell align="right">{row?.total}</TableCell>
//               <TableCell align="right">{row?.paid}</TableCell>
//               <TableCell align="right">{row?.status}</TableCell>
//               <TableCell align="right">{row?.payment}</TableCell>
//               <TableCell align="right"><DropdownForCustomer id={row?._id} setRefresh={setRefresh} refresh={refresh} api={"invoice"} /></TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//    </div>
//   );
// }

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography, Modal, Box, Button as MUIButton } from "@mui/material";
import Button from '@mui/joy/Button';
import Input from "@mui/joy/Input";
import AddNewCustomer from "./AddNewCustomer";
import { useNavigate } from "react-router-dom";
import { getData } from "../others/api";
import DropdownForCustomer from "./DropdownForCustomer";
import ReactToPdf from "react-to-pdf";
import { usePDF } from 'react-to-pdf';
import logo from "../assets/amsi-logo.png";

export default function InvoiceTable() {
  const [state, setState] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [selectedInvoice, setSelectedInvoice] = React.useState(null);
  const pdfRef = React.useRef();
  const { toPDF, targetRef } = usePDF({filename: 'invoice.pdf'});
  const navigate = useNavigate();

  // Fetch data on component mount
  React.useEffect(() => {
    setLoading(true);
    getData("/invoice")
      .then((response) => {
        setData(response?.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [refresh]);

  const navigateToCreate = () => {
    navigate("/invoice/create");
  };

  const handleOpen = (invoice) => {
    setSelectedInvoice(invoice);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInvoice(null);
  };

  return (
    <div>
      {/* <AddNewCustomer state={state} setState={setState} /> */}

      <div className="content-topbar">
        <div className="content-title">
          <ArrowBackIcon />
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Invoices
          </Typography>
        </div>
        <div className="content-title">
          <Input size="md" placeholder="Search" />
          <Button variant="contained" color="primary" onClick={navigateToCreate}>
            Add New Invoice
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell align="right">Client</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Expire Date</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">View</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row?._id}>
                <TableCell component="th" scope="row">
                  {row?.number}
                </TableCell>
                <TableCell align="right">{row?.client}</TableCell>
                <TableCell align="right">{row?.date}</TableCell>
                <TableCell align="right">{row?.expireDate}</TableCell>
                <TableCell align="right">{row?.total}</TableCell>
                <TableCell align="right">{row?.status}</TableCell>
                <TableCell align="right">
                  <MUIButton onClick={() => handleOpen(row)}>View</MUIButton> 
                </TableCell>
                 <TableCell align="right"><DropdownForCustomer id={row?._id} setRefresh={setRefresh} refresh={refresh} api={"invoice"} /></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Invoice */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            bgcolor: "background.paper",
            p: 4,
            boxShadow: 24,
            borderRadius: 2,
          }}
        >


          <div>

            <Button style={{display:"block", marginLeft:"auto" }} size="md" variant={"solid"} color="primary"  onClick={() => toPDF()}>
          Download
        </Button>

         <div ref={targetRef}>
         {selectedInvoice && (
            <div ref={pdfRef} style={{ padding: "20px" }}>
              {/* Invoice Header */}
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <img
                  src={logo}
                  alt="Company Logo"
                  style={{ width: "100px" }}
                />
                <Typography variant="h4" fontWeight="bold">
                  Invoice
                </Typography>
              </div>

              {/* Client and Invoice Details */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Typography>
                    <strong>Client:</strong> {selectedInvoice?.client}
                  </Typography>
                  <Typography>
                    <strong>Date:</strong> {selectedInvoice?.date}
                  </Typography>
                  <Typography>
                    <strong>Expire Date:</strong> {selectedInvoice?.expireDate}
                  </Typography>
                </div>
                <div>
                  <Typography>
                    <strong>Invoice #:</strong> {selectedInvoice?.number}
                  </Typography>
                  <Typography>
                    <strong>Status:</strong> {selectedInvoice?.status}
                  </Typography>
                </div>
              </div>

              {/* Invoice Table */}
              <Table style={{ marginTop: "20px" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">VAT</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{selectedInvoice?.description}</TableCell>
                    <TableCell align="right">{selectedInvoice?.price}</TableCell>
                    <TableCell align="right">{selectedInvoice?.vat}</TableCell>
                    <TableCell align="right">
                      {selectedInvoice?.total}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* Footer */}
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <Typography variant="body2">
                  Thank you for your business!
                </Typography>
              </div>
            </div>
          )}
         </div>
      </div>

        </Box>
      </Modal>
    </div>
  );
}
