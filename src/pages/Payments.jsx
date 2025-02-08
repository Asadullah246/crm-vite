import React from 'react';
import Printing from '../component/PrintableSection';
import PaymentTable from '../component/PaymentTable';

const Payments = () => {
      const [user, setUser] = React.useState();

      React.useEffect(() => {
        const getUser = JSON.parse(localStorage.getItem("user"));
        setUser(getUser);
      }, []);

    return (

         <div className='pageLayout' >
            {user?.role == "admin" ?
              <PaymentTable customer={false}/>:
              <PaymentTable customer={true} custId={user?._id}/>
              }

                </div>
    );
};

export default Payments;
