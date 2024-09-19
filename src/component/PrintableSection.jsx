// src/App.jsx
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

// The section we want to print
const PrintableSection = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} style={{ padding: '20px', border: '1px solid black' }}>
      <h2 style={{color:"red"}}>Printable Section</h2>
      <p>This section will be printed as PDF.</p>
      <p>Here is some more content you want to include in the PDF.</p>
    </div>
  );
});

// Set a display name for the forwardRef component
PrintableSection.displayName = 'PrintableSection';

const Printing = () => {
  const componentRef = useRef();

  // Function to trigger print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current, // specify the component to print
  });

  return (
    <div>
      <h1>React Print PDF Example</h1>

      {/* The section to be printed */}
      <PrintableSection ref={componentRef} />

      {/* Button to trigger print action */}
      <button onClick={handlePrint} style={{ marginTop: '20px' }}>
        Print as PDF
      </button>
    </div>
  );
};

export default Printing;
