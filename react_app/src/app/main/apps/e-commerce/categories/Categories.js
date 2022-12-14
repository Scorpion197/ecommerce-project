import { useDeepCompareEffect, useThemeMediaQuery } from "@fuse/hooks";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";

import reducer from "../store";
import { getAllCategories, selectCategories } from "../store/categoriesSlice";
import { Chip, Stack } from "@mui/material";
import CategoriesContent from "./CategoriesContent";
import CategoriesHeader from "./CategoriesHeader";
import FusePageCarded from "@fuse/core/FusePageCarded";
/**
 * Form Validation Schema
 */


function Categories(props) {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  return (
  
   <FusePageCarded
   header={<CategoriesHeader />}
   content={<CategoriesContent />}
   scroll={isMobile ? 'normal' : 'content'}
 />
  )
}

export default withReducer("eCommerceApp", reducer)(Categories);
