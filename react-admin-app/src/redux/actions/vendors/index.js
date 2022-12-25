import * as actionTypes from "./actionTypes";

export const activateVendor = (vendorId) => {
  return {
    type: actionTypes.ACTIVATE_VENDOR,
    id: vendorId,
  };
};

export const deactivateVendor = (vendorId) => {
  return {
    type: actionTypes.DEACTIVATE_VENDOR,
    id: vendorId,
  };
};
