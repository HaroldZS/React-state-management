"use client";
import { useRef } from "react";
import { FaRegStar } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { GoRepoLocked } from "react-icons/go";
import { IoClose } from "react-icons/io5";

function SecurityForm() {
  const modalRef = useRef<HTMLDialogElement>(null);

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

  return (
    <>
      <button className="btn" onClick={openModal}>
        Delete this repository
      </button>
      <dialog id="my_modal_1" className="modal" ref={modalRef}>
        <div className="modal-box flex flex-col">
          <div className="border-b-[1px] pb-4 text-sm flex justify-between items-center">
            <p>Delete HaroldZS/AnyRepositoryToDelete</p>
            <IoClose className="text-xl cursor-pointer" onClick={closeModal} />
          </div>
          <div className="mx-auto pt-2">
            <GoRepoLocked className="text-2xl" />
          </div>
          <h3 className="font-bold text-lg text-center pt-4">
            HaroldZS/AnyRepositoryToDelete
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
          <p className="text-sm mb-1 pt-4">
            To confirm, type "HaroldZS/AnyRepositoryToDelete" in the box below
          </p>
          <div className="modal-action mt-0">
            <form method="dialog" style={{ width: "100%" }}>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-error mb-3 w-full h-8 hover:border-secondary focus:border-none"
              />
              <button className="btn w-full min-h-0 h-8" onClick={closeModal}>
                Delete this repository
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export { SecurityForm };
