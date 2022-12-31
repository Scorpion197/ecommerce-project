import React, { useState, useEffect } from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { styled } from "@mui/material/styles";
import { TextField, Button, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import useThemeMediaQuery from "../../../../@fuse/hooks/useThemeMediaQuery";
import axios from "axios";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
    "& > .container": {
      maxWidth: "100%",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ChangeEmail = () => {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [emailField, setEmailField] = useState("");
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setEmailField(event.target.value);
  };

  const handleEmailChange = async () => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const endpoint = "http://localhost:8000/update-vendor-email/";
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
      },
    };

    const data = {
      email: email,
      newEmail: emailField,
    };

    axios
      .put(endpoint, data, requestConfig)
      .then((res) => {
        console.log("Email updated successfully");
        setOpen(true);
      })
      .catch((error) => {
        console.log("Error while updating email: ", error);
      });
  };

  const handleSendLink = async () => {
    const token = localStorage.getItem("token");
    const endpoint =
      "http://localhost:8000/dj-rest-auth/registration/resend-email/";

    const data = {
      email: emailField,
    };
    axios
      .post(endpoint, data)
      .then((res) => {
        console.log("Email sent successfully");
        localStorage.clear();
        setOpen(false);
        setRedirect(true);
      })
      .catch((error) => {
        console.log("Error while sending activation link: ", error);
      });
  };

  useEffect(() => {
    if (redirect) return navigate("/sign-in");
  }, [redirect]);

  return (
    <Box
      sx={{
        width: "70%",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          sx={{
            width: "300px",
            height: "60px",
            paddingBottom: "10px",
          }}
          onChange={handleChange}
        />

        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{
            width: "200px",
          }}
          onClick={handleEmailChange}
        >
          Change Email
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Get Confirmation Link"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Please verify your email in order to confirm your email and
              continue using the plateforme
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSendLink}>Send link</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Box>
  );
};

export default ChangeEmail;
