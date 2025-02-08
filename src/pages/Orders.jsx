import React from 'react';
import CustomerOrders from '../component/CustomerOrders';
import AllOrders from '../component/AllOrders';

const Orders = () => {

       const [userRole, setUserRole]=React.useState();
        React.useEffect(() => {
            const userData=localStorage.getItem("userRole");
            console.log("user", userData);
            setUserRole(userData);
           }, []);

    return (
        <div className='pageLayout' >
            {userRole == "admin" ?
            <AllOrders/>
            :
            <CustomerOrders/>
            }

        </div>
    );
};

export default Orders;
