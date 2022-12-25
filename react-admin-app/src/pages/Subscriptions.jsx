import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "../components/table/Table";
import { useDispatch } from "react-redux";
import {
  acceptSubscription,
  revokeSubscription,
} from "../redux/actions/subscriptions";
import axios from "axios";

const customerTableHead = [
  "ID",
  "First Name",
  "Family Name",
  "Phone",
  "Email",
  "Created at",
  "Started at",
  "Expires at",
  "status",
  "Email Verified",
  "Update",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const RenderBody = ({ item, index }) => {
  const dispatch = useDispatch();
  const [subscriptionStatus, setSubscriptionStatus] = useState(item?.status);
  const handleClick = (event) => {
    event.preventDefault();
    if (item.status == "pending" || item.status == "expired") {
      dispatch(acceptSubscription(item.id));
      updateSubscription(item.id, "running");
    } else if (item.status == "running") {
      dispatch(revokeSubscription(item.id));
      updateSubscription(item.id, "pending");
    }
  };

  const updateSubscription = async (subscriptionId, newStatus) => {
    const endpoint = `http://localhost:8000/subscriptions/${subscriptionId}/`;
    const token = localStorage.getItem("token");
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
      },
    };

    const data = { status: newStatus };
    axios
      .put(endpoint, data, requestConfig)
      .then((res) => {
        console.log("Updated subscription successfully");
        setSubscriptionStatus(res?.data?.status);
      })
      .catch((err) => {
        console.log("Error while updating subscription");
      });
  };

  return (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.owner_first_name}</td>
      <td>{item.owner_family_name}</td>
      <td>{item.owner_phone}</td>
      <td>{item.owner_email}</td>
      <td>{item.created_at}</td>
      <td>{item.started_at}</td>
      <td>{item.expires_at}</td>
      <td>{subscriptionStatus}</td>
      <td>{item.email_verified}</td>
      <td>
        <Button variant="contained" onClick={handleClick}>
          {subscriptionStatus == "pending" || subscriptionStatus == "expired"
            ? "Accept"
            : "Revoke"}
        </Button>
      </td>
    </tr>
  );
};

const Subscriptions = () => {
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);
  const loadData = async () => {
    const endpoint = "http://localhost:8000/get-subscriptions/";
    const token = localStorage.getItem("token");
    console.log("token: ", token);
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
      },
    };

    axios
      .get(endpoint, requestConfig)
      .then((res) => {
        console.log("Fetched subscriptions: ", res);
        setSubscriptions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error while fetching subscriptions: ", err);
      });
  };

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
      <div>
        <h2 className="page-header">Subscriptions</h2>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card__body">
                <Table
                  limit="10"
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={subscriptions}
                  renderBody={(item, index) => RenderBody({ item, index })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Subscriptions;
