import * as React from "react";
import AdminDashboard from "./AdminDashboard";
import CustomerDashboard from "./CustomerDashboard";

const DashboardInfo = () => {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user"));
    setUser(getUser);
  }, []);
  return (
    <div  className='pageLayout' >
      {/* <div className="content-topbar">
        <div className="content-title">
          <ArrowBackIcon />
          <Typography
            variant="h6"
            component="h6"
            style={{ fontWeight: "bold" }}
          >
            Good Morning, Admin
          </Typography>
        </div>
        <div className="content-title">
          <Button
            size="md"
            variant={"solid"}
            color="primary"
            onClick={()=>navigate("/customer")}
          >
            Customers
          </Button>

        </div>
      </div> */}
 {/* <CustomerDashboard /> */}
      {user?.role == "admin" ? (
        <>
          <AdminDashboard />
        </>
      ) : (
        <CustomerDashboard />
      )}
    </div>
  );
};

export default DashboardInfo;
