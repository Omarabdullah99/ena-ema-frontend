import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, Navigate } from "react-router-dom";
import Modal from "../common/Modal";
import {
  selectedUserWishList,
  selectedWishListStatus,
  deleteWishListAsync,
} from "../redux/features/WishListSlice";

export default function WishList() {
  const dispatch = useDispatch();
  const wishProduct = useSelector(selectedUserWishList);
  // console.log("wishproudct", wishProduct);


  const wishListStatus = useSelector(selectedWishListStatus);

  
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(null);



  const handleRemove = (wishListId) => {
    console.log("delete wish list id", wishListId);
    dispatch(deleteWishListAsync(wishListId));
    setOpenModal(null);
  };

  if (wishListStatus == "loading") {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    ); // ডেটা ফেচ হওয়ার সময় লোডিং মেসেজ দেখান
  }

  return (
    <>
      {!wishProduct?.length && <Navigate to={"/"} replace="true"></Navigate>}
      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              WishList
            </h1>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {wishProduct?.map((product) => (
                  <li key={product?._id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product?.product?.thumbnail}
                        alt={product?.product?.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a>{product?.product?.title}</a>
                          </h3>
                          <p className="ml-4">{product?.product?.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product?.product?.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="mt-1 text-lg text-black">
                          {product?.product?.category}
                        </p>

                        <div className="flex">
                          <Modal
                            title={`Delete ${product?.product?.title}`}
                            message="Are you sure you want to delete this Cart item?"
                            dangerOption="Delete"
                            cancelOption="Cancel"
                            dangerAction={() => handleRemove(product?._id)} // e পাস করো
                            cancelAction={() => setOpenModal(null)}
                            showModal={openModal === product?.id}
                          />
                          <button
                            onClick={(e) => {
                              setOpenModal(product.id);
                            }}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
