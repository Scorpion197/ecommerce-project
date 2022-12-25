import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "../components/table/Table";
import { useDispatch } from "react-redux";
import { activateVendor, deactivateVendor } from "../redux/actions/vendors";
import axios from "axios";

const VendorsTableHead = [
  "ID",
  "First Name",
  "Family Name",
  "Phone",
  "Email",
  "Is Active",
  "Actions",
];
const renderHead = (item, index) => <th key={index}>{item}</th>;

const RenderBody = ({ item, index }) => {
  const handleClick = async () => {
    const token = localStorage.getItem("token");
    const endpoint = `http://localhost:8000/vendors/${item?.id}/`;
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json",
      },
    };

    console.log("ENDPOINT: ", endpoint);
    const data = {
      first_name: item.first_name,
      family_name: item.family_name,
      email: item.email,
      user_type: "VENDOR",
      is_active: JSON.stringify(item.is_active) == "true" ? false : true,
    };

    axios
      .put(endpoint, data, requestConfig)
      .then((res) => {
        console.log("console.log user status updated successfully");
      })
      .catch((error) => {
        console.log("Error while updating vendor active status: ", error);
      });
  };
  return (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.first_name}</td>
      <td>{item.family_name}</td>
      <td>{item.phone}</td>
      <td>{item.email}</td>
      <td>{JSON.stringify(item.is_active)}</td>
      <td>
        <Button variant="contained" onClick={handleClick}>
          {JSON.stringify(item.is_active) == "true" ? "Deactivate" : "Activate"}
        </Button>
      </td>
    </tr>
  );
};
const Vendors = () => {
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState([]);

  const fetchVendors = async () => {
    const token = localStorage.getItem("token");
    const endpoint = "http://localhost:8000/vendors/";
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
      },
    };

    axios
      .get(endpoint, requestConfig)
      .then((res) => {
        console.log("vendors: ", res?.data);
        setVendors(res?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error while fetching vendors: ", error);
      });
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  else
    return (
      <div>
        <h2 className="page-header">Vendors</h2>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card__body">
                <Table
                  limit="10"
                  headData={VendorsTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={vendors}
                  renderBody={(item, index) => RenderBody({ item, index })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Vendors;
