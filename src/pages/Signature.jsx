import React, { useRef } from "react";
import { Box, Typography, Stack } from "@mui/material";
import SignatureCanvas from "react-signature-canvas";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from '@mui/joy/Button';
import Input from "@mui/joy/Input";
import { useNavigate } from "react-router-dom";

export default function SignaturePage() {
  const navigate = useNavigate();
  const sigPad = useRef(null);

  const clearSignature = () => {
    sigPad.current.clear();
  };

  const handleSubmit = () => {
    const signatureImage = sigPad.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    console.log("Signature Image:", signatureImage);
    // You can send the signatureImage to your backend API here
  };

  return (
    <div className="pageLayout">
      <div className="content-topbar">
        <div className="content-title">
          <ArrowBackIcon style={{cursor:"pointer" }}  onClick={() => navigate(-1)} />
          <Typography
            variant="h6"
            component="h6"
            style={{ fontWeight: "bold" }}
          >
            Agreement Document
          </Typography>
        </div>
      </div>

      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          margin: "auto",
          mt: 0,
          border: "1px solid #ddd",
          borderRadius: 2,
          p: 4,
        //   boxShadow: 3,
        }}
      >
        {/* Header */}
        <Typography variant="h5" textAlign="center" gutterBottom>
          Terms & Conditions
        </Typography>

        {/* Rules or Conditions Text */}
        <Box
          sx={{
            p: 2,
            mb: 3,
            border: "1px solid #ddd",
            borderRadius: 2,
            bgcolor: "#f9f9f9",
            // maxHeight: 200,
            overflowY: "auto",
          }}
        >
          <Typography variant="body1" paragraph>
            Please read the following terms and conditions carefully:
          </Typography>
          <Typography variant="body2" paragraph>
            1. You agree to provide accurate and up-to-date information during
            the registration process.
          </Typography>
          <Typography variant="body2" paragraph>
            2. All services are provided "as-is" and without any warranty of any
            kind.
          </Typography>
          <Typography variant="body2" paragraph>
            3. You are responsible for maintaining the confidentiality of your
            account and password.
          </Typography>
          <Typography variant="body2" paragraph>
            4. Your signature below signifies that you agree to all the terms
            and conditions outlined above.
          </Typography>
        </Box>

        {/* Signature Canvas */}
        <Stack spacing={2} alignItems="start" sx={{marginTop:"40px"}}>
          <Typography variant="subtitle1">
            Please provide your signature below:
          </Typography>
          <SignatureCanvas
            ref={sigPad}
            penColor="black"
            canvasProps={{
              width: 300,
              height: 150,
              className: "sigCanvas",
              style: { border: "1px solid #ddd", borderRadius: 4 },
            }}
          />
          <Stack direction="row" spacing={2} sx={{paddingTop:"20px"}}>
            <Button variant="outlined" onClick={clearSignature}>
              Clear
            </Button>
            <Button size="md" variant={"solid"} color="primary" onClick={handleSubmit} >
            Submit
        </Button>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}
