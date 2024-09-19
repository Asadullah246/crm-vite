

import React from 'react';
import InvoiceTable from '../component/InvoiceTable';

const Invoice = () => {
  return (
    <div className='pageLayout'>
      <InvoiceTable/>

    </div>
  );
};

export default Invoice;







// import React, { useState } from 'react';
// import { Editor } from "@tinymce/tinymce-react";

// const Invoice = () => {
//     const [info, setInfo] = useState("");
//     const handleEditor = (newValue, editor) => {
//         console.log("value", newValue);
//         // console.log("editor", editor.getContent({ format: "text" }));
//         setInfo({ newValue });
//       };
//     return (
//         <div>
//               <Editor
//             apiKey="wl0ewtcrvaqa9ebkm96g6e120fagyn7bf899yw2n4opjqrrb"
//             init={{
//               plugins:
//                 "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
//               toolbar:
//                 "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
//               tinycomments_mode: "embedded",
//               tinycomments_author: "Asadullah",
//               mergetags_list: [
//                 { value: "First.Name", title: "First Name" },
//                 { value: "Email", title: "Email" },
//               ],
//               ai_request: (request, respondWith) =>
//                 respondWith.string(() =>
//                   Promise.reject("See docs to implement AI Assistant")
//                 ),
//             }}
//             initialValue="type here"
//             onEditorChange={handleEditor}
//           />

// <div dangerouslySetInnerHTML={{ __html: info }} />
//         </div>
//     );
// };

// export default Invoice;
