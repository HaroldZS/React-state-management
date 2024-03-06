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

interface States {
  loading: boolean;
  error: boolean;
  confirmed: boolean;
  deleted: boolean;
  value: string;
}

class SecurityFormCC extends React.Component<Props, States> {
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

  // Life Cycle Methods
  UNSAFE_componentWillMount(): void {
    // Component about to be mounted
  }

  componentDidMount(): void {
    // Component mounted
  }

  componentDidUpdate(): void {
    if (this.state.loading) {
      setTimeout(() => {
        if (this.state.value === this.props.repository) {
          this.onConfirm();
        } else {
          this.onError();
        }
      }, 1500);
    }
  }

  componentWillUnmount(): void {
    // Component unmounted
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
    this.setState({
      loading: true,
    });
  }
  onError(): void {
    this.setState({
      error: true,
      loading: false,
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
    const { loading, error, confirmed, deleted, value } = this.state;

    if (!confirmed && !deleted) {
      return (
        <>
          <button className="btn" onClick={this.openModal}>
            Delete this repository
          </button>
          <dialog id="my_modal_1" className="modal" ref={this.modalRef}>
            <div className="modal-box flex flex-col">
              <div className="flex items-center justify-between text-sm">
                <p>Delete {repository}</p>
                <IoClose
                  className="cursor-pointer text-xl"
                  onClick={() => {
                    this.onClose();
                    this.closeModal();
                  }}
                />
              </div>
              <div className="divider"></div>
              <div className="mx-auto pt-2">
                <GoRepoLocked className="text-2xl" />
              </div>
              <h3 className="pt-4 text-center text-lg font-bold">
                {repository}
              </h3>
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
              {error && !loading && (
                <p className="pb-4 text-center">Error: Incorrect code</p>
              )}
              {loading && <p className="pb-4 text-center">Loading...</p>}
              <p className="mb-1 text-sm">
                To confirm, type "{repository}" in the box below
              </p>
              <div className="modal-action mt-0">
                <form method="dialog" style={{ width: "100%" }}>
                  <input
                    type="text"
                    placeholder={repository}
                    className="input input-bordered input-error mb-3 h-8 w-full hover:border-secondary focus:border-none"
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      this.onWrite(e.target.value)
                    }
                  />
                  <button
                    className="btn h-8 min-h-0 w-full"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      this.onCheck();
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
    } else if (confirmed && !deleted) {
      return (
        <>
          <button className="btn" onClick={this.openModal}>
            Delete this repository
          </button>
          <dialog id="my_modal_1" className="modal" ref={this.modalRef}>
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
                    this.onDelete();
                  }}
                >
                  Yes, I'm sure
                </button>
                <button
                  className="btn btn-error h-8 min-h-0"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    this.onReset();
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
          <button className="btn" onClick={this.openModal}>
            Delete this repository
          </button>
          <dialog id="my_modal_1" className="modal" ref={this.modalRef}>
            <div className="modal-box flex flex-col">
              <p className="mb-5 text-center">Successfully deleted!</p>
              <button
                className="btn h-8 min-h-0"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  this.onReset();
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
}

export { SecurityFormCC };
