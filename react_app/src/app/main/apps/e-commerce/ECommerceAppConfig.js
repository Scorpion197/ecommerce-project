import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Product = lazy(() => import("./product/Product"));
const Products = lazy(() => import("./products/Products"));
const Order = lazy(() => import("./order/Order"));
const Orders = lazy(() => import("./orders/Orders"));
const Categories = lazy(() => import("./categories/Categories"));
const ProfileApp = lazy(() => import("../profile/ProfileApp"));
const SecuredRoute = lazy(() => import("../../../SecuredRoute/SecuredRoute"));

const ECommerceAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "apps/e-commerce/products",
      element: (
        <SecuredRoute>
          <Products />
        </SecuredRoute>
      ),
    },
    {
      path: "apps/e-commerce/products/:productId/*",
      element: (
        <SecuredRoute>
          <Product />
        </SecuredRoute>
      ),
    },
    {
      path: "apps/e-commerce/orders",
      element: (
        <SecuredRoute>
          <Orders />
        </SecuredRoute>
      ),
    },
    {
      path: "apps/e-commerce/orders/:orderId",
      element: (
        <SecuredRoute>
          <Order />
        </SecuredRoute>
      ),
    },
    {
      path: "apps/e-commerce/categories",
      element: (
        <SecuredRoute>
          <Categories />
        </SecuredRoute>
      ),
    },
    {
      path: "apps/e-commerce/profile",
      element: (
        <SecuredRoute>
          <ProfileApp />
        </SecuredRoute>
      ),
    },
    {
      path: "apps/e-commerce",
      element: (
        <SecuredRoute>
          <Products />
        </SecuredRoute>
      ),
    },
  ],
};

export default ECommerceAppConfig;
