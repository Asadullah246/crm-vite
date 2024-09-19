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

export default function InvoiceTable() {

    const [state, setState] = React.useState(false);
    const navigate = useNavigate();
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);

    // Fetch data on component mount
    React.useEffect(() => {
      setLoading(true);
      getData('/invoice')
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
    const navigateToCreate = () => {
      navigate("/invoice/create")
      };

      console.log("in", data);

  return (
   <div>
    <AddNewCustomer state={state} setState={setState} toggleDrawer={toggleDrawer} ></AddNewCustomer>
    <div className='content-topbar'>
        <div className='content-title'>
           <ArrowBackIcon/>
           <Typography variant="h6" component="h6" style={{fontWeight:"bold"}} >
        Invoices
      </Typography>
        </div>
        <div className='content-title'>
        <Input size="md" placeholder="Search" />;
        <Button size="md" variant={"solid"} color="primary" onClick={navigateToCreate}>
          Add New Invoice
        </Button>
        {/* <Button size="md" variant={"solid"} color="primary"  onClick={()=>toggleDrawer("right", true)}>
            {"right"}
          </Button> */}
        </div>
    </div>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%", width:"100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell align="right">Client</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Expire Date</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Paid</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Payment</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row?.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.number}
              </TableCell>
              <TableCell align="right">{row?.client}</TableCell>
              <TableCell align="right">{row?.date}</TableCell>
              <TableCell align="right">{row?.expireDate}</TableCell>
              <TableCell align="right">{row?.total}</TableCell>
              <TableCell align="right">{row?.paid}</TableCell>
              <TableCell align="right">{row?.status}</TableCell>
              <TableCell align="right">{row?.payment}</TableCell>
              <TableCell align="right"><DropdownForCustomer id={row?._id} setRefresh={setRefresh} refresh={refresh} api={"invoice"} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </div>
  );
}
