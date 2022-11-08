import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {
  getProducts,
  selectProducts,
  selectProductsSearchText,
} from "../store/productsSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_BACKEND_API_URL;

function ProductsTable(props) {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const searchText = useSelector(selectProductsSearchText);

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(products);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });

  const [productDeleted, setProductDeleted] = useState(false);
  const [clickedProductId, setClickedProductId] = useState(-1);
  const navigate = useNavigate();

  const handleRedirectToProduct = (productId) => {
    setClickedProductId(productId);
  };

  useEffect(() => {
    if (clickedProductId != -1) {
      navigate(`/apps/e-commerce/products/${clickedProductId}`);
    }
  }, [clickedProductId]);

  useEffect(() => {
    dispatch(getProducts()).then(() => setLoading(false));
  }, [dispatch, productDeleted]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(products, (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setPage(0);
    } else {
      setData(products);
    }
  }, [products, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";

    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.navigate(`/apps/e-commerce/products/${item.id}/${item.handle}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  const handleDeleteClick = async (productId) => {
    const token = localStorage.getItem("token");
    const endpoint = API_URL + `/products/${productId}/`;
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
      },
    };

    axios
      .delete(endpoint, requestConfig)
      .then((res) => {
        if (res.status == 204) {
          console.log("Produce deleted");
          setProductDeleted(true);
        }
      })
      .catch((error) => {
        console.log("error while deleting product");
      });
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no products!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product?.name}
                </TableCell>
                <TableCell align="right">{product?.price}</TableCell>
                <TableCell align="right">{product?.quantity}</TableCell>
                <TableCell align="right">{product?.color}</TableCell>
                <TableCell align="right">{product?.created_at}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={0}>
                    <IconButton
                      aria-label="delete"
                      onClick={(event) => {
                        event.preventDefault();
                        handleDeleteClick(product.id);
                      }}
                    >
                      <DeleteIcon
                        sx={{
                          color: "red",
                        }}
                      />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={(event) => {
                        event.preventDefault();
                        handleRedirectToProduct(product?.id);
                      }}
                    >
                      <EditIcon
                        sx={{
                          color: "blue",
                        }}
                      />
                    </IconButton>
                    <IconButton
                      arial-label="view-product"
                      onClick={(event) => {
                        event.preventDefault();
                        handleRedirectToProduct(product?.id);
                      }}
                    >
                      <VisibilityIcon
                        sx={{
                          color: "gray",
                        }}
                      />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default withRouter(ProductsTable);
