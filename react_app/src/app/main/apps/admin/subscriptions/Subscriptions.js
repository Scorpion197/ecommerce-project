import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import SubscriptionsHeader from "./SubscriptionsHeader";
import SubscriptionsTable from "./SubscriptionsTable";

function Subscriptions() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<SubscriptionsHeader />}
      content={<SubscriptionsTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("eCommerceApp", reducer)(Subscriptions);
