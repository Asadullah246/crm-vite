import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography } from "@mui/material";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { useNavigate } from "react-router-dom";
import { postData } from "../others/api";
import toastSuccess from "../component/Alert";

const CreateWelcomeTemplate = () => {
  const [info, setInfo] = useState();
  const [name,setName]=useState("")
  const handleEditor = (newValue, editor) => {
    console.log("value", newValue);
    // console.log("editor", editor.getContent({ format: "text" }));
    setInfo({ newValue });
  };

  const saveToDatabase = (e) => {
    e?.prevent?.default();
    const data = { templateData:info?.newValue, category: "welcomeTemplate", name:name };
    console.log("data", data);
    postData("/template", data) // Replace '/items' with your API endpoint
      .then((response) => {
        // setData((prev) => [...prev, response]);
        toastSuccess("Successfully customer created");
        console.log("post res", response);
      });
  };

  return (
    <div>
      <div className="content-topbar">
        <div className="content-title">
          <ArrowBackIcon />
          <Typography
            variant="h6"
            component="h6"
            style={{ fontWeight: "bold" }}
          >
            New Template
          </Typography>
        </div>
        <div className="content-title">
          <Input size="md" placeholder="Template Name" onChange={(e)=>setName(e.target.value)} />;
          <Button
            size="md"
            variant={"solid"}
            color="primary"
            onClick={saveToDatabase}
          >
            Save
          </Button>

        </div>
      </div>
      <Editor
        apiKey="wl0ewtcrvaqa9ebkm96g6e120fagyn7bf899yw2n4opjqrrb"
        init={{
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Asadullah",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
        initialValue="type here"
        onEditorChange={handleEditor}
      />
    </div>
  );
};

export default CreateWelcomeTemplate;
