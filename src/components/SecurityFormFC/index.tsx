/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useRef, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { GoRepoLocked } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { SecurityAppState } from "@/interfaces/SecurityAppState";

function SecurityFormFC({ repository }: { repository: string }) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<SecurityAppState>({
    loading: false,
    error: false,
    confirmed: false,
    deleted: false,
    value: "",
  });

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
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  // States
  function onCheck() {
    console.log(state.value);
    setState({
      ...state,
      loading: true,
    });
  }

  function onError() {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  }

  function onWrite(newValue: string) {
    setState({
      ...state,
      value: newValue,
    });
  }

  function onConfirm() {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  }

  function onDelete() {
    setState({
      ...state,
      deleted: true,
    });
  }

  function onReset() {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
  }

  if (!state.confirmed && !state.deleted) {
    return (
      <>
        <button className="btn" onClick={openModal}>
          Delete this repository
        </button>
        <dialog id="my_modal_1" className="modal" ref={modalRef}>
          <div className="modal-box flex flex-col">
            <div className="border-b-[1px] pb-4 text-sm flex justify-between items-center">
              <p>Delete HaroldZS/{repository}</p>
              <IoClose
                className="text-xl cursor-pointer"
                onClick={closeModal}
              />
            </div>
            <div className="mx-auto pt-2">
              <GoRepoLocked className="text-2xl" />
            </div>
            <h3 className="font-bold text-lg text-center pt-4">
              HaroldZS/{repository}
            </h3>
            <div className="flex justify-center gap-2 border-b-[1px] py-4 text-sm">
              <span className="flex items-center gap-2">
                <FaRegStar />
                <p>5 stars</p>
              </span>
              <span className="flex items-center gap-2">
                <GoEye />
                <p>1 watchers</p>
              </span>
            </div>
            {state.error && !state.loading && (
              <p className="text-center mt-3">Error: Incorrect code</p>
            )}
            {state.loading && <p className="text-center mt-3">Loading...</p>}
            <p className="text-sm mb-1 pt-4">
              To confirm, type "HaroldZS/{repository}" in the box below
            </p>
            <div className="modal-action mt-0">
              <form method="dialog" style={{ width: "100%" }}>
                <input
                  type="text"
                  placeholder={repository}
                  className="input input-bordered input-error mb-3 w-full h-8 hover:border-secondary focus:border-none"
                  value={state.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onWrite(e.target.value)
                  }
                />
                <button
                  className="btn w-full min-h-0 h-8"
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
            <p>Confirmed</p>
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
            <p>Deleted</p>
          </div>
        </dialog>
      </>
    );
  }
}

export { SecurityFormFC };
