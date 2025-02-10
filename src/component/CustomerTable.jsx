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
import DropdownForCustomer, { DropdownForCustomerSpecial } from './DropdownForCustomer';
import {  useNavigate } from 'react-router-dom';
import { fetchData } from '../others/common';
import AddingProductService from './AddingProductService';
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";



export default function BasicTable() {


    const [state, setState] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const navigate=useNavigate();
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [currentCustomer, setCurrentCustomer]=React.useState();
      const [search, setSearch] = React.useState("");


    // React.useEffect(() => {
    //   let isMounted = true;
    //   setLoading(true);

    //   const handleForm = async () => {
    //     try {
    //       const result = await getData("customer");
    //       setData(result?.data);
    //       if (isMounted) setLoading(false);
    //     } catch (error) {
    //       console.error("Error creating data:", error);
    //       if (isMounted) setLoading(false);
    //     }
    //   };

    //   handleForm();

    //   return () => {
    //     isMounted = false;
    //   };
    // }, [refresh]);



      React.useEffect(() => {
        let isMounted = true; // Track if component is still mounted
        setLoading(true);

        const fetchProducts = async () => {
          setData([]);

          try {
            // Construct query parameters dynamically
            const queryParams = new URLSearchParams();
            if (search) queryParams.append("search", search);
            // if (user?._id) queryParams.append("customerId", user?._id);

            const result = await getData(`customer?${queryParams.toString()}`); // Fetch with filters
            if (isMounted) {
              setData(result?.data || []);
              setLoading(false);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
            if (isMounted) setLoading(false);
          }
        };

        fetchProducts();

        return () => {
          isMounted = false; // Cleanup when component unmounts
        };
      }, [ search, refresh]);






    // const handleOpenModal = () => {
    //   setModalOpen(true);
    // };

    const handleCloseModal = () => {
      setModalOpen(false);
    };





    const toggleDrawer = (inOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }

        setState(inOpen);
      };

    const newProductAdd = (cust) => {
      setModalOpen(true);
      setCurrentCustomer(cust)
      };

      // console.log("dta", data);

  return (
   <div>
    <AddNewCustomer state={state} setState={setState} toggleDrawer={toggleDrawer} ></AddNewCustomer>

    <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
      >
        <ModalDialog variant={"outlined"}
        sx={{ width: "100%", maxWidth: 700 }}
        // layout="fullscreen"
         >
          <ModalClose />
          <DialogTitle>Add Product/service </DialogTitle>
          <DialogContent>
            <AddingProductService customer={currentCustomer}/>
          </DialogContent>
        </ModalDialog>
      </Modal>


    {/* {isModalOpen && (
        <AddingProductService isOpen={isModalOpen} onClose={handleCloseModal} />
      )} */}
    <div className='content-topbar'>
        <div className='content-title' >
           <ArrowBackIcon style={{cursor:"pointer" }}  onClick={() => navigate(-1)}/>
           <Typography variant="h6" component="h6" style={{fontWeight:"bold"}} >
           Customers
      </Typography>
        </div>
        <div className='content-title'>

        <Input
            size="md"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        <Button size="md" variant={"solid"} color="primary" onClick={toggleDrawer(true)}>
          Add New Customer
        </Button> 
        {/* <Button size="md" variant={"outlined"} color="primary" onClick={()=>navigate("/upload-customer")}>
          Upload Customers
        </Button> */}

        </div>
    </div>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%", width:"100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell>ID</TableCell> */}
            <TableCell>Name</TableCell>
            <TableCell align="right">phone</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Postal Code</TableCell>
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
                {row?.name}
              </TableCell>
              {/* <TableCell align="right">{row?.name}</TableCell> */}
              <TableCell align="right">{row?.phone}</TableCell>
              <TableCell align="right">{row?.email}</TableCell>
              <TableCell align="right">{row?.address}</TableCell>
              <TableCell align="right">{row?.city}</TableCell>
              <TableCell align="right">{row?.postalCode}</TableCell>
              <TableCell align="right"><DropdownForCustomerSpecial id={row?._id}  setRefresh={setRefresh} refresh={refresh} api={"customer"} newProductAdd={()=>newProductAdd(row)} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </div>
  );
}
