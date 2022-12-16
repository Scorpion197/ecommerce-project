import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";
import Product from "../Layout/Product/Product";
import styles from "./Products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const endpoint = "http://localhost:8000/client-products/";
    axios
      .get(endpoint)
      .then((res) => {
        console.log("RESPONSE: ", res);
        setProducts(res?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error while fetching client products: ", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      {products.map((p: any) => {
        return (
          <Product
            key={p.id}
            title={p?.name}
            price={p?.price}
            imageLink={p?.images[0]}
            id={p?.id}
          />
        );
      })}
    </div>
  );
};

export default Products;
