import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Input from "@mui/joy/Input";
import { Typography } from "@mui/material";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Stack from "@mui/joy/Stack";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import AlertMessage, { toastError } from "./Alert";
import toastSuccess from "./Alert";
import { postData } from "../others/api";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Radio, RadioGroup, Textarea } from "@mui/joy";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { createData } from "../others/common";

export default function AddNewProduct({ state, toggleDrawer }) {
  const [values, setValues] = React.useState({});
  const [emiStatus, setEmiStatus] = React.useState(null);
  const [emiOptionsData, setEmiOptionsData] = React.useState([
    { duration: "", pricePerMonth: "" },
  ]);
  const [paymentMethod, setpaymentMethod] = React.useState("");

  React.useEffect(() => {
    if (values.type == "product" || values.type == "service") {
      setEmiStatus("emi");
    }
    else {
      setEmiStatus("service");
    }
  }, [values?.type]);





  // const handleChange = (event) => {
  //   setpaymentMethod(event.target.value); // Update the state with the selected value
  // };


  // Handle input change for an EMI option
  const handleInputChange = (index, field, value) => {
    const updatedOptions = [...emiOptionsData];
    updatedOptions[index][field] = value;
    setEmiOptionsData(updatedOptions);
  };

  // Add a new EMI option
  const addEmiOption = () => {
    setEmiOptionsData([...emiOptionsData, { duration: "", pricePerMonth: "" }]);
  };

  // Delete an EMI option
  const deleteEmiOption = (index) => {
    const updatedOptions = emiOptionsData.filter((_, i) => i !== index);
    setEmiOptionsData(updatedOptions);
  };

  function generateHeatingId() {
    const randomNumber = Math.floor(Math.random() * 10000); // Generate a random number
    const heatingId = `AMSI${randomNumber}`; // Concatenate "Heating" with the random number
    return heatingId;
  }

  const handleForm = async(e) => {
    e?.prevent?.default();
    // const data = { ...values, randomId: generateHeatingId() };

    const data = { ...values };
console.log("data", data);



if(values.type.includes("product") || values.type.includes("service")){
  data.emiOptions=emiOptionsData;
}


      try {
          const result = await createData(data, "product"); // Wait for the promise to resolve
          console.log("Customer created successfully", result);
          if (result.status == "success") {
            toastSuccess("Successfully customer created");
          }
        } catch (error) {
          console.error("Error creating data:", error);
          toastError("something went wrong");
        }

  };

  const list = () => (
    <Box
      role="presentation"
      // onClick={toggleDrawer(false)}
      // onKeyDown={toggleDrawer(false)}
      sx={{ padding: "30px", paddingBottom: "50px" }}
    >
      <Typography
        variant="h5"
        component="h5"
        sx={{ fontWeight: 600, marginBottom: "30px" }}
      >
        Add New Product/service
      </Typography>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            onChange={(event) =>
              setValues({ ...values, name: event.target.value })
            }
          />
          <FormHelperText>{/* <InfoOutlined /> */}</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          {/* <Input
            type="text"
            onChange={(event) =>
              setValues({ ...values, address: event.target.value })
            }
          /> */}

          <Textarea
            minRows={3} // Adjust the number of rows as needed
            onChange={(event) =>
              setValues({ ...values, description: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Type</FormLabel>
          {/* <Input
            type="text"
            onChange={(event) =>
              setValues({ ...values, serviceType: event.target.value })
            }
          /> */}
          <Select
          multiple
            onChange={(event, newValue) =>
              setValues({ ...values, type: newValue })
            }
            placeholder="Select type"
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
            <Option value="product">Product</Option>
            <Option value="service">Service</Option>
            <Option value="subscription">Subscription</Option>
          </Select>

          <FormHelperText></FormHelperText>
        </FormControl>





{
  (values?.type?.includes("product") || values?.type?.includes("service")) &&

  <>
       <FormControl>
          <FormLabel>One Time Price</FormLabel>
          <Input
            type="number"
            onChange={(event) =>
              setValues({ ...values, oneTimePaymentAmount: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>

        <FormLabel>EMI Options:</FormLabel>
        {emiOptionsData.map((option, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <FormControl sx={{ marginRight: "8px", width: "100%" }}>
                  <FormLabel>Duration (months)</FormLabel>
                  <Input
                    type="number"
                    value={option.duration}
                    onChange={(e) =>
                      handleInputChange(index, "duration", e.target.value)
                    }
                    required
                    sx={{ width: "30%" }}
                  />
                </FormControl>
                <FormControl sx={{ marginRight: "8px", width: "100%" }}>
                  <FormLabel>Price Per Month ($)</FormLabel>
                  <Input
                    type="number"
                    value={option.pricePerMonth}
                    onChange={(e) =>
                      handleInputChange(index, "pricePerMonth", e.target.value)
                    }
                    required
                    sx={{ width: "30%" }}
                  />
                </FormControl>
                <button
                  onClick={() => deleteEmiOption(index)}
                  style={{ border: "none", backgroundColor: "transparent" }}
                >
                  <ClearIcon />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addEmiOption}
              style={{
                border: "none",
                backgroundColor: "transparent",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <AddCircleOutlineIcon />
            </button>
        </>

//   <FormControl >
//   <FormLabel>Payment options</FormLabel>
//   <RadioGroup sx={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}
//    onChange={handleChange}
//    >
//         <Radio value="oneTimePayment" label="One Time Payment"  />
//         <Radio value="emi" label="EMI" sx={{marginTop:"0"}}  />
//       </RadioGroup>
// </FormControl>
}







       {values?.type?.includes("subscription") && <> 
        <FormLabel>Subscription Details</FormLabel>

        <FormControl>
          <FormLabel>Min Duration</FormLabel>
          <Input
            type="number"
            onChange={(event) =>
              setValues({ ...values, subscriptionDetails:{...values.subscriptionDetails, minDuration: event.target.value }})
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Max Duration</FormLabel>
          <Input
            type="number"
            onChange={(event) =>
              setValues({ ...values,subscriptionDetails:{...values.subscriptionDetails, maxDuration: event.target.value } })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Monthly Fee</FormLabel>
          <Input
            type="number"
            onChange={(event) =>
              setValues({ ...values, subscriptionDetails:{...values.subscriptionDetails, monthlyFee: event.target.value }})
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        </>}

        <Button
          size="md"
          variant={"solid"}
          color="primary"
          style={{ marginBottom: "50px" }}
          onClick={handleForm}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );

  return (
    <div>
      {/* <Button  onClick={toggleDrawer("right", true)}>
            {"right"}
          </Button> */}
      {/* {['top', 'right', 'bottom', 'left'].map((anchor) => ( */}
      <Drawer open={state} onClose={toggleDrawer(false)} anchor={"right"}>
        {list()}
      </Drawer>
      {/*    ))} */}
    </div>
  );
}
