import AppBar from "@mui/material/AppBar";
import { ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { memo } from "react";
import { useSelector } from "react-redux";
import { selectFooterTheme } from "app/store/fuse/settingsSlice";
import clsx from "clsx";
import PoweredByLinks from "../../shared-components/PoweredByLinks";
import DocumentationButton from "../../shared-components/DocumentationButton";
import PurchaseButton from "../../shared-components/PurchaseButton";

function FooterLayout1(props) {
  const footerTheme = useSelector(selectFooterTheme);

  return <></>;
}

export default memo(FooterLayout1);
