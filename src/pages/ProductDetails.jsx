import React, { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { fetchProductByIdAsync, selectedProduct } from "../redux/features/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectLoggedInUser } from "../redux/features/UserSlice";
// import { createCartByAsync, selectedCartItemByUserId } from "../cart/cartSlice";
import { toast } from "react-toastify";







const highlights = [
  "Hand cut and sewn locally",
  "Dyed with our proprietary colors",
  "Pre-washed & pre-shrunk",
  "Ultra-soft 100% cotton",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  // console.log('details user',user)
  useEffect(() => {
    dispatch(fetchProductByIdAsync(params?.id));
  }, [dispatch, params?.id]);

  const productById = useSelector(selectedProduct);
  // const selectedCardByUserId = useSelector(selectedCartItemByUserId);
  // console.log('useridcart check',selectedCardByUserId)
  if (!productById) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-5xl">
          <h3>Loading</h3>
        </div>
      </div>
    ); // ডেটা ফেচ হওয়ার সময় লোডিং মেসেজ দেখান
  }

  const product = productById;
  // console.log('detil product',product)

  // const handleCart = (e) => {
  //   e.preventDefault();
  //   if (
  //     selectedCardByUserId.findIndex((item) => item.product.id === product.id) <
  //     0
  //   ) {
  //     dispatch(
  //       createCartByAsync({
  //         product: product.id,
  //         quantity: 1,
  //         user: user?.user?.id,
  //       })
  //     );
  //     //this message will provide backend
  //     toast.success("Cart Add Successfully!"); // সফল ম্যাসেজ
  //   } else {
  //     //this message will provide backend
  //     toast.error("This item already added!");
  //   }
  // };

  return (
    <>
      <div className="bg-white">
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={productById.images[0]}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={productById.images[1]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={productById.images[2]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={productById.images[3]}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-xl tracking-tight   text-gray-900">
                {product?.price}
              </p>
              <p className="text-3xl tracking-tight text-gray-900">
                stock available hobe
              </p>

              <form className="mt-10">
           

                {user?.result?._id ? (
                  <button
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    // onClick={handleCart}
                  >
                    Add To Cart
                  </button>
                ) : (
                  <Link to={"/login"}>
                    <button
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Login
                    </button>
                  </Link>
                )}
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Description
                </h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {highlights?.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
