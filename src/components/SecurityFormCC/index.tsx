/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import { useRef } from "react";
import { FaRegStar } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { GoRepoLocked } from "react-icons/go";
import { IoClose } from "react-icons/io5";

interface Props {
  repository: string;
}

class SecurityFormCC extends React.Component<Props> {
  modalRef: React.RefObject<HTMLDialogElement>;

  constructor(props: Props) {
    super(props);
    this.modalRef = React.createRef();
    this.state = {
      loading: false,
      error: false,
      confirmed: false,
      deleted: false,
      value: "",
    };
  }

  // Modal
  openModal = () => {
    if (this.modalRef.current) {
      this.modalRef.current.showModal();
    }
  };

  closeModal = () => {
    if (this.modalRef.current) {
      this.modalRef.current.close();
    }
  };

  // State
  onCheck(): void {
    this.setState({});
  }
  onError(): void {
    this.setState({
      loading: true,
    });
  }
  onWrite(newValue: string): void {
    this.setState({
      value: newValue,
    });
  }
  onConfirm(): void {
    this.setState({
      error: false,
      loading: false,
      confirmed: true,
    });
  }
  onDelete(): void {
    this.setState({
      deleted: true,
    });
  }
  onReset(): void {
    this.setState({
      confirmed: false,
      deleted: false,
      value: "",
    });
  }
  onClose(): void {
    this.setState({
      loading: false,
      error: false,
      confirmed: false,
      deleted: false,
      value: "",
    });
  }

  render() {
    const { repository } = this.props;

    return (
      <>
        <button className="btn" onClick={this.openModal}>
          Delete this repository
        </button>
        <dialog id="my_modal_1" className="modal" ref={this.modalRef}>
          <div className="modal-box flex flex-col">
            <div className="flex items-center justify-between border-b-[1px] pb-4 text-sm">
              <p>Delete {repository}</p>
              <IoClose
                className="cursor-pointer text-xl"
                onClick={this.closeModal}
              />
            </div>
            <div className="mx-auto pt-2">
              <GoRepoLocked className="text-2xl" />
            </div>
            <h3 className="pt-4 text-center text-lg font-bold">{repository}</h3>
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
            <p className="mb-1 pt-4 text-sm">
              To confirm, type "{repository}" in the box below
            </p>
            <div className="modal-action mt-0">
              <form method="dialog" style={{ width: "100%" }}>
                <input
                  type="text"
                  placeholder={repository}
                  className="input input-bordered input-error mb-3 h-8 w-full hover:border-secondary focus:border-none"
                />
                <button
                  className="btn h-8 min-h-0 w-full"
                  onClick={this.closeModal}
                >
                  Delete this repository
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </>
    );
  }
}

export { SecurityFormCC };
