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


export default function TemplateTable({category, redirectUrl}) {


    const [state, setState] = React.useState(false);
    const navigate = useNavigate();
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);

    // Fetch data on component mount
    React.useEffect(() => {
      setLoading(true);
      getData('/template')
        .then((response) => {
            // const categoriedData=response?.data?.filter(single=>single?.category==category)
          setData(response?.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, [refresh,category]);

    const navigateToCreate = () => {
        navigate(redirectUrl)
        };


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
           <ArrowBackIcon style={{cursor:"pointer" }}  onClick={() => navigate(-1)}/>
           <Typography variant="h6" component="h6" style={{fontWeight:"bold"}} >
        Invoices
      </Typography>
        </div>
        <div className='content-title'>
        <Input size="md" placeholder="Search" />

        <Button size="md" variant={"solid"} color="primary" onClick={navigateToCreate}>
          Add New Template
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
            <TableCell>Name</TableCell>
            <TableCell align="right">Category</TableCell>
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
                {row?.name}
              </TableCell>
              <TableCell align="right">{row?.category}</TableCell>
              <TableCell align="right"><DropdownForCustomer id={row?._id} setRefresh={setRefresh} refresh={refresh} api={"template"} show={`/template/edit/${row?._id}`} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </div>
  );
}
