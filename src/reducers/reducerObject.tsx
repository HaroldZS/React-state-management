import { SecurityAppState } from "@/interfaces/SecurityAppState";
import { ReducerAction } from "@/interfaces/ReducerAction";
import { actionTypes } from "@/actions/actionTypes";

const reducer = (state: SecurityAppState, payload?: any) => ({
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },
  [actionTypes.close]: {
    loading: false,
    error: false,
    confirmed: false,
    deleted: false,
    value: "",
  },
});

export const reducerObject = (state: SecurityAppState, action: ReducerAction) =>
  reducer(state, action.payload)[action.type] ?? state;
