import * as actionTypes from "./actionTypes";

export const acceptSubscription = (subscriptionId) => {
  return {
    type: actionTypes.ACCEPT_SUBSCRIPTION,
    id: subscriptionId,
  };
};

export const revokeSubscription = (subscriptionId) => {
  return {
    type: actionTypes.REVOKE_SUBSCRIPTION,
    id: subscriptionId,
  };
};
