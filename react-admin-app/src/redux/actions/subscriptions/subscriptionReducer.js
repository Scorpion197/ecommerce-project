import * as actionTypes from "./actionTypes";

const initialState = {
  id: null,
};

const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACCEPT_SUBSCRIPTION:
      return {
        ...state,
        id: action.id,
      };

    case actionTypes.REVOKE_SUBSCRIPTION:
      return {
        ...state,
        id: action.id,
      };
    default:
      return state;
  }
};

export default subscriptionReducer;
