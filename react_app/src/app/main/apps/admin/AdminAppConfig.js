import { lazy } from "react";

const Subscriptions = lazy(() => import("./subscriptions/Subscriptions"));

const AdminAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "admin/subscriptions",
      element: <Subscriptions />,
    },
  ],
};

export default AdminAppConfig;
