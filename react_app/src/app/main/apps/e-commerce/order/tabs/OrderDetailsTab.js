import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GoogleMap from "google-map-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import OrdersStatus from "../OrdersStatus";
import { selectOrder } from "../../store/orderSlice";

function Marker(props) {
  return (
    <Tooltip title={props.text} placement="top">
      <FuseSvgIcon className="text-red">
        heroicons-outline:location-marker
      </FuseSvgIcon>
    </Tooltip>
  );
}

function OrderDetailsTab() {
  const order = useSelector(selectOrder);
  const [map, setMap] = useState("shipping");

  return (
    <div>
      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <FuseSvgIcon color="action">
            heroicons-outline:user-circle
          </FuseSvgIcon>
          <Typography className="h2 mx-12 font-medium" color="text.secondary">
            Customer
          </Typography>
        </div>

        <div className="mb-24">
          <div className="table-responsive mb-48">
            <table className="simple">
              <thead>
                <tr>
                  <th>
                    <Typography className="font-semibold">
                      Client Fullname
                    </Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Phone</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Address</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Product</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Payment</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Status</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">
                      Created At
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center">
                      <Typography className="truncate mx-8">
                        {`${order.client_fullname}`}
                      </Typography>
                    </div>
                  </td>
                  <td>
                    <Typography className="truncate">
                      {order.client_phone}
                    </Typography>
                  </td>
                  <td>
                    <Typography className="truncate">
                      {order.address}
                    </Typography>
                  </td>
                  <td>
                    <span className="truncate">{order.product}</span>
                  </td>
                  <td>
                    <span className="truncate">{order.payment_amount}</span>
                  </td>
                  <td>
                    <span className="truncate">{order.status}</span>
                  </td>
                  <td>
                    <span className="truncate">{order.created_at}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsTab;
