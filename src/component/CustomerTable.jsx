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
import { getData } from '../others/api';
import DropdownForCustomer from './DropdownForCustomer';



export default function BasicTable() {


    const [state, setState] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);

    // Fetch data on component mount
    React.useEffect(() => {
      setLoading(true);
      getData('/customer') // Replace '/items' with your API endpoint
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

      console.log("dta", data);

  return (
   <div>
    <AddNewCustomer state={state} setState={setState} toggleDrawer={toggleDrawer} ></AddNewCustomer>
    <div className='content-topbar'>
        <div className='content-title' >
           <ArrowBackIcon/>
           <Typography variant="h6" component="h6" style={{fontWeight:"bold"}} >
        Customers
      </Typography>
        </div>
        <div className='content-title'>
        <Input size="md" placeholder="Search" />;
        <Button size="md" variant={"solid"} color="primary" onClick={toggleDrawer(true)}>
          Add New Person
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
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">phone</TableCell>
            <TableCell align="right">Postal Code</TableCell>
            <TableCell align="right">Service Type</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Payment</TableCell>
            <TableCell align="right">Manage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row?._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.randomId}
              </TableCell>
              <TableCell align="right">{row?.name}</TableCell>
              <TableCell align="right">{row?.email}</TableCell>
              <TableCell align="right">{row?.address}</TableCell>
              <TableCell align="right">{row?.phone}</TableCell>
              <TableCell align="right">{row?.postalCode}</TableCell>
              <TableCell align="right">{row?.serviceType}</TableCell>
              <TableCell align="right">{row?.price}</TableCell>
              <TableCell align="right">{row?.payment}</TableCell>
              <TableCell align="right"><DropdownForCustomer id={row?._id} setRefresh={setRefresh} refresh={refresh} api={"customer"} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </div>
  );
}
