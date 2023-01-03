import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import axios from "axios";
import { Redirect } from "react-router-dom";
const phoneRegex = "^0[0-9]*";

const validationSchema = yup.object({
  email: yup
    .string("enter your email")
    .email("Enter a valid email")
    .required("email is required"),
  password: yup
    .string("Enter your password")
    .required("Please enter your password")
    .min(8, "Password too short"),
  phone: yup
    .string()
    .matches(phoneRegex, "Invalid Phone number")
    .min(10)
    .max(10),
  firstName: yup.string().required("You must enter your first name"),
  familyName: yup.string().required("You must enter your family name"),
});

const initValues = {
  email: "",
  password: "",
  phone: "",
  firstName: "",
  familyName: "",
};

const Signup = () => {
  const [redirect, setRedirect] = useState(false);
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const endpoint = "http://localhost:8000/create-admin/";
      axios
        .post(endpoint, values)
        .then((res) => {
          console.log("Admin created successfully: ", res?.data);
          localStorage.setItem("token", res?.data?.token);
          setRedirect(true);
        })
        .catch((error) => {
          console.log("Error occured while creating admin: ", error);
        });
    },
  });

  if (redirect) return <Redirect to="/" />;
  else
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "20%",
          margin: "auto",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: "30px",
            fontWeight: "bold",
            color: "#2980b9",
          }}
        >
          Create Admin Account
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            sx={{
              marginTop: "20px",
            }}
          />
          <TextField
            fullWidth
            id="familyName"
            name="familyName"
            label="Family Name"
            value={formik.values.familyName}
            onChange={formik.handleChange}
            error={
              formik.touched.familyName && Boolean(formik.errors.familyName)
            }
            helperText={formik.touched.familyName && formik.errors.familyName}
            sx={{
              marginTop: "20px",
            }}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              marginTop: "20px",
            }}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
              marginTop: "20px",
            }}
          />
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            sx={{
              marginTop: "20px",
            }}
          />
        </form>
        <Button
          type="submit"
          variant="contained"
          onClick={formik.handleSubmit}
          sx={{
            marginTop: "20px",
            width: "180px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Create Account
        </Button>
      </Box>
    );
};

export default Signup;
