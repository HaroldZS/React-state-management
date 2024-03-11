import { SecurityAppState } from "@/interfaces/SecurityAppState";
import { ReducerAction } from "@/interfaces/ReducerAction";
import { actionTypes } from "@/actions/actionTypes";

export const reducerIf = (state: SecurityAppState, action: ReducerAction) => {
  if (action.type === actionTypes.confirm) {
    return {
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    };
  } else if (action.type === actionTypes.error) {
    return {
      ...state,
      error: true,
      loading: false,
    };
  } else if (action.type === actionTypes.write) {
    return {
      ...state,
      value: action.payload,
    };
  } else if (action.type === actionTypes.check) {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === actionTypes.delete) {
    return {
      ...state,
      deleted: true,
    };
  } else if (action.type === actionTypes.reset) {
    return {
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    };
  } else if (action.type === actionTypes.close) {
    return {
      loading: false,
      error: false,
      confirmed: false,
      deleted: false,
      value: "",
    };
  } else {
    return state;
  }
};
