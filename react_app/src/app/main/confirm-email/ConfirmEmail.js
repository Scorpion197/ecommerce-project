import React, { useState } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmEmail = () => {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const handleLoginClick = (event) => {
    event.preventDefault();
    setRedirect(true);
  };

  const handleResendEmail = async () => {
    const endpoint = "http://localhost:8000/resend-email/";
    const email = localStorage.getItem("email");
    const data = {
      email: email,
    };

    axios
      .post(endpoint, data)
      .then((res) => {
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.log("Error while resending verification email: ", error);
      });
  };

  if (redirect) return navigate("/sign-in");
  else
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#f1f2f6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "60%",
            height: "20%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CheckCircleIcon
            sx={{
              color: "#27ae60",
              width: "50px",
              height: "50px",
            }}
          />
          <Box
            sx={{
              width: "60%",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: "20px",
              }}
            >
              Please check your email and confirm your account in order to
              complete registration process. If you didn't receive any email
              please click on Resend email.
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              marginTop: "10px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleResendEmail}
            >
              Resend Email
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoginClick}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Box>
    );
};

export default ConfirmEmail;
