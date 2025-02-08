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
import { createData, updateData } from "../others/common";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile ({ state, setState ,toggleDrawer, user, refresh, setRefresh }) {
  const [values, setValues] = React.useState({});
  const navigate = useNavigate();
  React.useEffect(()=>{


setValues({
    streetAddress: user?.streetAddress || user?.address,
  email: user?.email,
  name: user?.name,
  phone: user?.phone,
  password: user?.password,
  postalCode: user?.postalCode,
  })


  }, [user])


  function generateHeatingId() {
    const randomNumber = Math.floor(Math.random() * 10000); // Generate a random number
    const heatingId = `AMSI${randomNumber}`; // Concatenate "Heating" with the random number
    return heatingId;
  }



  const handleAlert = () => {
    alert("Successfully profile updated. Please log in again."); // Shows an alert with an "OK" button
    navigate("/signup"); // Redirects to login page after clicking "OK"
  };


  const handleForm = async(e) => {
    e?.prevent?.default();
    // const data = { ...values, randomId: generateHeatingId() };


      try {
          const result = await updateData(values, `customer/${user?._id}`); // Wait for the promise to resolve
          if (result.status == "success") {
            localStorage.removeItem("user");
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("userRole");
            localStorage.removeItem("role"); 
            handleAlert();
            // setRefresh(!refresh);
            // toastSuccess("Successfully profile updated");
            setState(false)
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
        Add New Customer
      </Typography>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={values?.name}
            onChange={(event) =>
              setValues({ ...values, name: event.target.value })
            }
          />
          <FormHelperText>{/* <InfoOutlined /> */}</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input
            type="phone"
            value={values?.phone}
            onChange={(event) =>
              setValues({ ...values, phone: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={values?.email}
            onChange={(event) =>
              setValues({ ...values, email: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="text"
            required
            value={values?.password}
            onChange={(event) =>
              setValues({ ...values, password: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Street Address</FormLabel>
          <Input
            type="text"
            value={values?.streetAddress}
            onChange={(event) =>
              setValues({ ...values, streetAddress: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>City</FormLabel>
          <Input
            type="text"
            value={values?.city}
            onChange={(event) =>
              setValues({ ...values, city: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Postal Code</FormLabel>
          <Input
            type="number"
            value={values?.postalCode}
            onChange={(event) =>
              setValues({ ...values, postalCode: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>

        {/* <FormControl>
          <FormLabel>Service Type</FormLabel>
          <Select
           onChange={(event, newValue) =>
            setValues({ ...values, serviceType: newValue })
          }

                  placeholder="Select service"
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
                  <Option value="monthly">Monthly</Option>
                  <Option value="yearly">Yearly</Option>
                </Select>

          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Service Price</FormLabel>
          <Input
            type="number"
            onChange={(event) =>
              setValues({ ...values, price: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Service Start</FormLabel>
          <Input
            type="date"
            onChange={(event) =>
              setValues({ ...values, startingDate: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Boiler Make</FormLabel>
          <Input
            type="text"
            onChange={(event) =>
              setValues({ ...values, boilerMake: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Assigned Engineer</FormLabel>
          <Input
            type="text"
            onChange={(event) =>
              setValues({ ...values, assignedEng: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Company Name</FormLabel>
          <Input
            type="text"
            onChange={(event) =>
              setValues({ ...values, AECompanyName: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Cover Engineer</FormLabel>
          <Input
            type="text"
            onChange={(event) =>
              setValues({ ...values, coverEng: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Company Name</FormLabel>
          <Input
            type="text"
            onChange={(event) =>
              setValues({ ...values, CECompanyName: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl> */}

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
