import FuseScrollbars from "@fuse/core/FuseScrollbars";
import FuseUtils from "@fuse/utils";
import _ from "@lodash";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";
import API from "../../../../../API";

function SubscriptionsTable(props) {
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "first_name", headerName: "First name", width: 150 },
    { field: "family_name", headerName: "Family name", width: 150 },
    {
      field: "created_at",
      headerName: "Created At",
      type: "number",
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 100,
    },
    {
      field: "phone",
      headerName: "Phone number",
      sortable: false,
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: false,
      width: 260,
    },
  ];
  const loadSubscriptions = async () => {
    const data = await API.fetchAllSubscriptions();
    var temp = [];
    if (data?.length > 0) {
      console.log("Fetched subscriptions: ", data);
      for (let i = 0; i < data?.length; i++) {
        temp[i] = data[i];
        temp[i]["first_name"] = data[i]["owner"]["first_name"];
        temp[i]["family_name"] = data[i]["owner"]["family_name"];
        temp[i]["email"] = data[i]["owner"]["email"];
        temp[i]["phone"] = data[i]["owner"]["phone"];
      }
      setLoading(false);
      setSubscriptions(temp);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no Subscriptions!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={subscriptions}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

export default withRouter(SubscriptionsTable);
