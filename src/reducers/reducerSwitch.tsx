import { SecurityAppState } from "@/interfaces/SecurityAppState";
import { ReducerAction } from "@/interfaces/ReducerAction";
import { actionTypes } from "@/actions/actionTypes";

export const reducerSwitch = (
  state: SecurityAppState,
  action: ReducerAction,
) => {
  switch (action.type) {
    case actionTypes.confirm:
      return {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
      };
    case actionTypes.error:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case actionTypes.write:
      return {
        ...state,
        value: action.payload,
      };
    case actionTypes.check:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.delete:
      return {
        ...state,
        deleted: true,
      };
    case actionTypes.reset:
      return {
        ...state,
        confirmed: false,
        deleted: false,
        value: "",
      };
    case actionTypes.close:
      return {
        loading: false,
        error: false,
        confirmed: false,
        deleted: false,
        value: "",
      };
    default:
      return state;
  }
};
