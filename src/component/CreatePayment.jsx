import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography } from "@mui/material";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Grid } from "@mui/joy";
import { getData, postData } from "../others/api";
import toastSuccess from "./Alert";
import { useParams } from "react-router-dom";
// import toastSuccess from "./Alert";
// import { getData, postData } from "../others/api";

const CreatePayment = () => {
  const { id } = useParams();

  const [values, setValues] = React.useState({});
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [person, setPerson]=React.useState()
  const [personData, setPersonData]=React.useState()

  // Fetch data on component mount
  React.useEffect(() => {
    setLoading(true);





  const handleForm = async(e) => {
    e?.prevent?.default();
    // const data = { ...values, randomId: generateHeatingId() };


      try {
          const result = await  getData(`/customer/paymentInfo/${id}`); // Wait for the promise to resolve
          console.log("Customer", result);
          if (result.status == "success") {
            toastSuccess("Successfully customer created");
          }
        } catch (error) {
          console.error("Error creating data:", error);
          // toastError("something went wrong");
        }

  };


    getData(`/customer/paymentInfo/${id}`)
      .then((response) => {
        setData(response?.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [refresh, id]);







  React.useEffect(() => {
    setLoading(true);
   const currentPerson=data?.find(s=>s?.name==person)
   setPersonData(currentPerson)
  }, [refresh, data, person]);


  const handleInvoiceCreate = (e) => {
    e?.prevent?.default();
    const invoiceData={...values,clientId:personData?._id}
    postData('/invoice', invoiceData)
      .then((response) => {
        toastSuccess("Successfully invoice created")
        console.log("post res", response);
      });
  };

  return (
    <div >
      <div className="content-topbar">
        <div className="content-title">
          <ArrowBackIcon />
          <Typography
            variant="h6"
            component="h6"
            style={{ fontWeight: "bold" }}
          >
            New
          </Typography>
        </div>
        <div className="content-title">
          {/* <Input size="md" placeholder="Search" />; */}
          <Button
            size="md"
            variant={"solid"}
            color="primary"
            onClick={handleInvoiceCreate}
          >
            Save
          </Button>
          {/* <Button size="md" variant={"solid"} color="primary"  onClick={()=>toggleDrawer("right", true)}>
            {"right"}
          </Button> */}
        </div>
      </div>
      <div>
        <div className="createInvoiceFields">
          <Grid container spacing={2}>
            {/* Grid Item that spans 2 columns */}
            <Grid item xs={12} sm={5}>
              <FormControl fullWidth>
                <FormLabel>Client</FormLabel>
                <Select
                  fullWidth
                  onChange={(event, newValue) =>{
                    setPerson(newValue)
                    setValues({ ...values, client: newValue })
                  }
                  }

                  placeholder=""
                  indicator={<KeyboardArrowDown />}
                  sx={{
                    width: "100%",
                    [`& .${selectClasses.indicator}`]: {
                      transition: "0.2s",
                      [`&.${selectClasses.expanded}`]: {
                        transform: "rotate(-180deg)",
                      },
                    },
                  }}
                >
                  {data?.map(person=>{
                    return (
                      <Option key={person?._id} value={person?.name}>{person?.name}</Option>
                    )
                  })}
                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>

            {/* Another Grid Item that spans 2 columns */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Number</FormLabel>
                <Input
                  type="number"
                  value={values.number}
                  onChange={(event) =>
                    setValues({ ...values, number: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Year</FormLabel>
                <Input
                  type="number"
                  value={values.year}
                  onChange={(event) =>
                    setValues({ ...values, year: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Status</FormLabel>
                <Select
                  onChange={(event, newValue) =>{
                    setValues({ ...values, status: newValue})
                  }
                  }
                  placeholder="Select status"
                  indicator={<KeyboardArrowDown />}
                  sx={{
                    width: "100%",
                    [`& .${selectClasses.indicator}`]: {
                      transition: "0.2s",
                      [`&.${selectClasses.expanded}`]: {
                        transform: "rotate(-180deg)",
                      },
                    },
                  }}
                >
                   <Option value="sent">sent</Option>
                  <Option value="draft">draft</Option>

                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  value={values.date}
                  onChange={(event) =>
                    setValues({ ...values, date: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Expire Date</FormLabel>
                <Input
                  type="date"
                  value={values.expireDate}
                  onChange={(event) =>
                    setValues({ ...values, expireDate: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Note</FormLabel>
                <Input
                  type="text"
                  value={values.note}
                  onChange={(event) =>
                    setValues({ ...values, note: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "40px" }}>
            {/* Grid Item that spans 2 columns */}

            {/* Another Grid Item that spans 2 columns */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Service</FormLabel>
                <Input
                  type="text"
                  value={values.service}
                  onChange={(event) =>
                    setValues({ ...values, service: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={values.description}
                  onChange={(event) =>
                    setValues({ ...values, description: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>package Type</FormLabel>
                <Select
                 onChange={(event, newValue) =>{
                  setValues({ ...values, serviceType: newValue })
                }
                }
                  placeholder="Select package"
                  indicator={<KeyboardArrowDown />}
                  sx={{
                    width: "100%",
                    [`& .${selectClasses.indicator}`]: {
                      transition: "0.2s",
                      [`&.${selectClasses.expanded}`]: {
                        transform: "rotate(-180deg)",
                      },
                    },
                  }}
                >
                  <Option value="monthly" selected={personData?.serviceType=="monthly"}>Monthly</Option>
                  <Option value="yearly" selected={personData?.serviceType=="yearly"}>Yearly</Option>
                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  defaultValue={personData?.price}
                  onChange={(event) =>
                    setValues({ ...values, price: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Divider style={{margin:"40px 0"}} />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
          <Button
              size="md"
              variant={"solid"}
              color="primary"
              onClick={handleInvoiceCreate}
            >
              Save
            </Button>
          </div>
            <div style={{textAlign:"end"}}>
              <div className="endFlex">
                <label htmlFor="">Sub Total : </label>
                <Input
                  type="number"
                  value={values.subTotal}
                  onChange={(event) =>
                    setValues({ ...values, subTotal: event.target.value })
                  }
                />
              </div>
              <div className="endFlex">
              <FormLabel>Vat %</FormLabel>
              <FormControl >

                <Input
                  type="text"
                  value={values.vat}
                  onChange={(event) =>
                    setValues({ ...values, vat: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
              <FormControl >
                {/* <FormLabel>Package</FormLabel> */}
                <Input
                  type="text"
                  value={values.vatPrice}
                  onChange={(event) =>
                    setValues({ ...values, vatPrice: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
              </div>
              <div className="endFlex">
                <label htmlFor="">Total : </label>
                <Input
                  type="number"
                  value={values.total}
                  onChange={(event) =>
                    setValues({ ...values, total: event.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePayment;
