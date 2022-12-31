import FusePageSimple from "@fuse/core/FusePageSimple";
import { styled } from "@mui/material/styles";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useThemeMediaQuery from "../../../../@fuse/hooks/useThemeMediaQuery";
import BasicInfo from "./BasicInfo";
import ChangeEmail from "./ChangeEmail";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ProfileApp() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [value, setValue] = useState(0);

  const handleValueChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleValueChange}
              aria-label="basic tabs example"
            >
              <Tab label="Personal Info" {...a11yProps(0)} />
              <Tab label="Change email" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <BasicInfo />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ChangeEmail />
          </TabPanel>
        </Box>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default ProfileApp;
