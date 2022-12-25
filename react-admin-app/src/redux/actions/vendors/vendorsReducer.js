import * as actionTypes from "./actionTypes";

const initialState = {
  id: null,
};

const vendorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTIVATE_VENDOR:
      return {
        ...state,
        id: action.id,
      };
    case actionTypes.DEACTIVATE_VENDOR:
      return {
        ...state,
        id: action.id,
      };
    default:
      return state;
  }
};

export default vendorsReducer;
