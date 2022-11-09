import React, { useState, useEffect } from "react";
import { orange } from "@mui/material/colors";
import { lighten, styled } from "@mui/material/styles";
import clsx from "clsx";
import FuseUtils from "@fuse/utils";
import { Controller, useFormContext } from "react-hook-form";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Box from "@mui/material/Box";
import axios from "axios";
import { useDispatch } from "react-redux";
import { pushImageToProduct } from "../../store/productSlice";

const Root = styled("div")(({ theme }) => ({
  "& .productImageFeaturedStar": {
    position: "absolute",
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
  },

  "& .productImageUpload": {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },

  "& .productImageItem": {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      "& .productImageFeaturedStar": {
        opacity: 0.8,
      },
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& .productImageFeaturedStar": {
        opacity: 1,
      },
      "&:hover .productImageFeaturedStar": {
        opacity: 1,
      },
    },
  },
}));

function ProductImagesTab(props) {
  const [image, setImage] = useState(null);
  const methods = useFormContext();
  const { control, watch } = methods;
  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    event.preventDefault();
    setImage(event.target.files[0]);
  };

  const handleImageSubmit = async (event) => {
    event.preventDefault();
    console.log("submitted");
    // const token = localStorage.getItem("token");
    // const endpoint = "http://localhost:8000/add-product/";
    // const requestConfig = {
    //   headers: {
    //     Authorization: "Token " + token,
    //     "content-type": "multipart/form-data",
    //   },
    // };
    // let formData = new FormData();

    // console.log("image inside function: ", image);
    // formData.append("image", image);
    // console.log("Form data: ", formData);
    // axios
    //   .post(endpoint, formData, requestConfig)
    //   .then((res) => {
    //     console.log("image uploaded successfully");
    //   })
    //   .catch((err) => {
    //     console.log("Error while uploading image");
    //   });

  dispatch(pushImageToProduct("Julian Wan.jpg"))
  };
  const images = watch("images");

  return (
    <Root>
      <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
        <Controller
          name="images"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Box
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
                display: "flex",
                flexDirection: "row",
              }}
              component="label"
              onSubmit={(event) => {
                handleImageSubmit(event);
              }}
              htmlFor="button-file"
              className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
            >
              <input
                accept="image/*"
                className="hidden"
                id="button-file"
                type="file"
                onChange={(e)=>handleImageSubmit(e)}
              />
              <FuseSvgIcon size={32} color="action">
                heroicons-outline:upload
              </FuseSvgIcon>
            </Box>
          )}
        />
        {images?.map((image) => (
          <div
            role="button"
            className={clsx(
              "productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg"
            )}
            key={image?.id}
          >
            <FuseSvgIcon className="productImageFeaturedStar">
              heroicons-solid:star
            </FuseSvgIcon>
            <img
              className="max-w-none w-auto h-full object-contain"
              src={image}
              alt="product"
            />
          </div>
        ))}
      </div>
    </Root>
  );
}

export default ProductImagesTab;
