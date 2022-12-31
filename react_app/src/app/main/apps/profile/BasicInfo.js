import React from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { styled } from "@mui/material/styles";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
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

const BasicInfo = () => {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const loadData = async () => {
    const endpoint = "http://localhost:8000/vendor-detail/";
    const token = localStorage.getItem("token");
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
      },
    };

    axios
      .get(endpoint, requestConfig)
      .then((res) => {
        setUserData(res?.data);
        localStorage.setItem("email", res?.data?.email);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error while fetching vendor detail: ", error);
      });
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      firstName: userData?.first_name,
      familyName: userData?.family_name,
      shopName: userData?.shop_name,
      phoneNumber: userData?.phone,
    },
    onSubmit: (values) => {
      const token = localStorage.getItem("token");
      const endpoint = "http://localhost:8000/update-vendor/";
      const requestConfig = {
        headers: {
          Authorization: "Token " + token,
        },
      };

      const data = {
        first_name: values?.firstName,
        family_name: values?.familyName,
        password: values?.password,
        shop_name: values?.shopName,
        phone: values?.phoneNumber,
        user_type: "VENDOR",
      };
      console.log("data submitted: ", data);
      axios
        .put(endpoint, data, requestConfig)
        .then((res) => {
          console.log("res data: ", res?.data);
        })
        .catch((error) => {
          console.log("Error while updating vendor: ", error);
        });
    },
  });

  useEffect(() => {
    loadData();
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  else
    return (
      <Root
        header={
          <Box
            sx={{
              width: "100vh",
              height: "50px",
            }}
          ></Box>
        }
        content={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: "600",
                fontSize: "25px",
                marginBottom: "20px",
              }}
            >
              Personal Information
            </Typography>
            <Box
              sx={{
                width: "60%",
              }}
            >
              <form onSubmit={formik.handleSubmit}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="First name"
                      name="firstName"
                      variant="outlined"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      defaultValue={userData?.first_name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Family Name"
                      name="familyName"
                      variant="outlined"
                      value={formik.values.familyName}
                      onChange={formik.handleChange}
                      defaultValue={userData?.family_name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Phone"
                      name="phoneNumber"
                      variant="outlined"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      defaultValue={userData?.phone}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Shop Name"
                      name="shopName"
                      variant="outlined"
                      value={formik.values.shopName}
                      onChange={formik.handleChange}
                      defaultValue={userData?.shop_name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Password"
                      name="password"
                      type="password"
                      variant="outlined"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>
              </form>
            </Box>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              sx={{
                marginTop: "20px",
              }}
              onClick={formik.handleSubmit}
            >
              Edit Profile
            </Button>
          </Box>
        }
        scroll={isMobile ? "normal" : "page"}
      />
    );
};

export default BasicInfo;
