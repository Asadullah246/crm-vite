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
import AddNewCustomer from './AddNewCustomer';
import { useNavigate } from 'react-router-dom';
import { getData } from '../others/api';
import DropdownForCustomer from './DropdownForCustomer';


export default function PaymentTable() {


    const [state, setState] = React.useState(false);
    const navigate = useNavigate();
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);

    // Fetch data on component mount
    React.useEffect(() => {
      setLoading(true);
      getData('/payment')
        .then((response) => {
          setData(response?.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, [refresh]);


    const toggleDrawer = (inOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }

        setState(inOpen); 
      };

  return (
   <div>
    <AddNewCustomer state={state} setState={setState} toggleDrawer={toggleDrawer} ></AddNewCustomer>
    <div className='content-topbar'>
        <div className='content-title'>
           <ArrowBackIcon/>
           <Typography variant="h6" component="h6" style={{fontWeight:"bold"}} >
        Payment History
      </Typography>
        </div>
        <div className='content-title'>
        {/* <Input size="md" placeholder="Search" /> */}
        <Button size="md" variant={"outlined"} color="primary" onClick={()=>setRefresh(!refresh)}>
          Refresh
        </Button>
        {/* <Button size="md" variant={"solid"} color="primary"  onClick={()=>toggleDrawer("right", true)}>
            {"right"}
          </Button> */}
        </div>
    </div>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%", width:"100%" }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{backgroundColor:"#D3D3D3", }}>
             <TableCell sx={{fontWeight:"600"}}>Product/Service Name</TableCell>
            <TableCell sx={{fontWeight:"600"}} align="right">Customer</TableCell>
            <TableCell sx={{fontWeight:"600"}} align="right">Address</TableCell>
            <TableCell sx={{fontWeight:"600"}} align="right">Date</TableCell>
            <TableCell sx={{fontWeight:"600"}} align="right">Type</TableCell>
            <TableCell sx={{fontWeight:"600"}} align="right">Payment Mode</TableCell>
            <TableCell sx={{fontWeight:"600"}} align="right">Amount</TableCell>
            <TableCell sx={{fontWeight:"600"}} align="right">Status</TableCell>
            <TableCell sx={{fontWeight:"600"}} align="right">Note</TableCell>
            {/* <TableCell align="right">Note</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row?._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {row?.transactionId?.productId?.name}
              </TableCell>
              <TableCell align="right">
                {row?.customerId?.name} , {" "}
                {row?.customerId?.phone}, {" "}
                {row?.customerId?.email}
              </TableCell>
              <TableCell align="right">
                {row?.customerId?.streetAddress}, {" "}
                {row?.customerId?.city}, {" "}
                {row?.customerId?.postalCode}
              </TableCell>
              <TableCell align="right">{row?.paymentDate?.slice(0,10)}</TableCell>
              <TableCell align="right">{row?.transactionId?.type}</TableCell>
              <TableCell align="right">{row?.paymentMethod}</TableCell>
              <TableCell align="right">{row?.amount}</TableCell>
              <TableCell align="right">{row?.status}</TableCell>
              <TableCell align="right">{row?.note}</TableCell>
              {/* <TableCell align="right">{row?.payment}</TableCell>
              <TableCell align="right"><DropdownForCustomer id={row?._id} setRefresh={setRefresh} refresh={refresh} api={"payment"} /></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </div>
  );
}
