import { SecurityAppState } from "@/interfaces/SecurityAppState";
import { Reducer, useReducer } from "react";
import { actionTypes } from "@/actions/actionTypes";
import { ReducerAction } from "@/interfaces/ReducerAction";

const initialState: SecurityAppState = {
  loading: false,
  error: false,
  confirmed: false,
  deleted: false,
  value: "",
};

function useSecurityActions(reducer: Reducer<SecurityAppState, ReducerAction>) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Action creators
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onError = () => dispatch({ type: actionTypes.error });
  const onReset = () => dispatch({ type: actionTypes.reset });
  const onClose = () => dispatch({ type: actionTypes.close });
  const onWrite = ({ target: { value } }: any) =>
    dispatch({ type: actionTypes.write, payload: value });

  return {
    state,
    onCheck,
    onConfirm,
    onDelete,
    onError,
    onReset,
    onClose,
    onWrite,
  };
}

export { useSecurityActions };
