/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useReducer, useRef } from "react";
import { FaRegStar } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { GoRepoLocked } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { SecurityAppState } from "@/interfaces/SecurityAppState";
import { reducerObject } from "@/reducers/reducerObject";
import { actionTypes } from "@/actions/actionTypes";

const initialState: SecurityAppState = {
  loading: false,
  error: false,
  confirmed: false,
  deleted: false,
  value: "",
};

function SecurityFormRO({ repository }: { repository: string }) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [state, dispatch] = useReducer(reducerObject, initialState);

  // Action creators
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onError = () => dispatch({ type: actionTypes.error });
  const onReset = () => dispatch({ type: actionTypes.reset });
  const onClose = () => dispatch({ type: actionTypes.close });
  const onWrite = ({ target: { value } }: any) =>
    dispatch({ type: actionTypes.write, payload: value });

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value === repository) {
          onConfirm();
        } else {
          onError();
        }
      }, 1500);
    }
  }, [state.loading]);

  // Modal
  const openModal = (): void => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = (): void => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  if (!state.confirmed && !state.deleted) {
    return (
      <>
        <button className="btn" onClick={openModal}>
          Delete this repository
        </button>
        <dialog id="my_modal_1" className="modal" ref={modalRef}>
          <div className="modal-box flex flex-col">
            <div className="flex items-center justify-between text-sm">
              <p>Delete {repository}</p>
              <IoClose
                className="cursor-pointer text-xl"
                onClick={() => {
                  onClose();
                  closeModal();
                }}
              />
            </div>
            <div className="divider"></div>
            <div className="mx-auto pt-2">
              <GoRepoLocked className="text-2xl" />
            </div>
            <h3 className="pt-4 text-center text-lg font-bold">{repository}</h3>
            <div className="flex justify-center gap-2 text-sm">
              <span className="flex items-center gap-2 ">
                <FaRegStar />
                <p>5 stars</p>
              </span>
              <span className="flex items-center gap-2">
                <GoEye />
                <p>1 watchers</p>
              </span>
            </div>
            <div className="divider"></div>
            {state.error && !state.loading && (
              <p className="pb-4 text-center">Error: Incorrect code</p>
            )}
            {state.loading && <p className="pb-4 text-center">Loading...</p>}
            <p className="mb-1 text-sm">
              To confirm, type "{repository}" in the box below
            </p>
            <div className="modal-action mt-0">
              <form method="dialog" style={{ width: "100%" }}>
                <input
                  type="text"
                  placeholder={repository}
                  className="input input-bordered input-error mb-3 h-8 w-full hover:border-secondary focus:border-none"
                  value={state.value}
                  onChange={onWrite}
                />
                <button
                  className="btn h-8 min-h-0 w-full"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    onCheck();
                  }}
                >
                  Delete this repository
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <button className="btn" onClick={openModal}>
          Delete this repository
        </button>
        <dialog id="my_modal_1" className="modal" ref={modalRef}>
          <div className="modal-box flex flex-col">
            <p className="text-center">
              Confirm that you want to delete "HaroldZS/{repository}"
            </p>
            <div className="divider"></div>
            <div className="flex justify-center gap-10">
              <button
                className="btn btn-warning h-8 min-h-0"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  onDelete();
                }}
              >
                Yes, I'm sure
              </button>
              <button
                className="btn btn-error h-8 min-h-0"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  onReset();
                }}
              >
                No, go back
              </button>
            </div>
          </div>
        </dialog>
      </>
    );
  } else {
    return (
      <>
        <button className="btn" onClick={openModal}>
          Delete this repository
        </button>
        <dialog id="my_modal_1" className="modal" ref={modalRef}>
          <div className="modal-box flex flex-col">
            <p className="mb-5 text-center">Successfully deleted!</p>
            <button
              className="btn h-8 min-h-0"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                onReset();
              }}
            >
              Reset, go back
            </button>
          </div>
        </dialog>
      </>
    );
  }
}

export { SecurityFormRO };
