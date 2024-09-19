import React from 'react';
import TemplateTable from '../component/TemplateTable';

const WelcomeTemplate = () => {
    return (
        <div>
            <TemplateTable category={"welcomeTemplate"} redirectUrl={"/Template/create"}/>
        </div>
    );
};

export default WelcomeTemplate;
