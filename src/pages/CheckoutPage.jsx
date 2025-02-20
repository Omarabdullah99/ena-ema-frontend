import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  deleteCartItemAsync,
  selectedCartItemByUserId,
  updateCartItemAsync,
} from "../redux/features/CartSlice";


import {
  selectLoggedInUser,
  selectedUserDetails,
} from "../redux/features/UserSlice";
import { useEffect, useState } from "react";
import { createOrderAsync, selectCurrentOrder } from "../redux/features/OrderSlice";
import Modal from "../common/Modal";






function Checkout() {
  const dispatch = useDispatch();
  const products = useSelector(selectedCartItemByUserId);
  // console.log('cart item by userid',products)
  // console.log('item', products)
 

  const totalAmount = products?.reduce(
    (amount, item) => item?.product?.price * item.quantity + amount,
    0
  );
 
  const totalItems = products?.reduce(
    (total, item) => item.quantity + total,
    0
  );

  const [address, setAddress] = useState({
    number: "",
    street: "",
    city: "",
    zip: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [openModal, setOpenModal] = useState(null);

  const user = useSelector(selectLoggedInUser);
  // console.log('Login user',user)
  const userDetailsById=useSelector(selectedUserDetails)
  // console.log('userByIdDetails',userDetailsById)
  const currentOrder=useSelector(selectCurrentOrder)
  // console.log('currentOrder checkoutpage.jsx',currentOrder)


  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  
  const handleQuantity = (e, product) => {
    e.preventDefault();
    const quantity = Number(e.target.value);
    // console.log('value', e.target.value)
    dispatch(updateCartItemAsync({ id: product._id, quantity }));
  };

  const handleRemove = ( id) => {
    // console.log('id', id)
    dispatch(deleteCartItemAsync(id));
  };

 

  const handlePayment = (e) => {
    // console.log(e.target.value)
    setPaymentMethod(e.target.value);
  };

  const handleOrder = () => {
    if (address.number && address.street && address.city && paymentMethod) {
      const selectedAddress = address

      const order = {
        items: products,
        totalAmount,
        totalItems,
        userID: user?.result?._id,
        paymentMethod,
        selectedAddress, // এখানে নতুনভাবে ঠিকানা যুক্ত করা হলো
      };

      dispatch(createOrderAsync(order));
    console.log('handleorder',order)
    } else {
      alert("select address and payment method");
    }
  };
  // console.log('selectedAddress',selectedAddress)
  // console.log("paymentmethod",paymentMethod)
  return (
    <>
      {!products?.length && <h1 className="text-3xl text-red-300 text-center font-bold">No Data Add</h1>}
      {currentOrder && <Navigate to={`/order-success/${currentOrder._id}`} replace={true}></Navigate>}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3 mb-4">
         
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                  Shipping address
                  </h2>
                 
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="number"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="number"
                          type="number"
                          name="number"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={address.number} 
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          
                          id="street"
                          name="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={address.street} onChange={handleChange}
                        />
                       
                      </div>
                    </div>

                    <div className="sm:col-span-3 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={address.city} onChange={handleChange}
                        />
                       
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="zip"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                           name="zip"
                          id="zip"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={address.zip} onChange={handleChange} 
                        />
                        
                      </div>
                    </div>
                  </div>
                </div>

               

                <div className="border-b border-gray-900/10 pb-12">
                  
                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose One
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payments"
                            onChange={handlePayment}
                            value="cash"
                            type="radio"
                            checked={paymentMethod === "cash"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            name="payments"
                            onChange={handlePayment}
                            checked={paymentMethod === "card"}
                            type="radio"
                            value="card"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
          </div>
          <div className="lg:col-span-2">
            <div className=" px-5 py-10 mt-12 bg-white ">
              <div className="">
                <h1 className="text-4xl mb-5 font-bold tracking-tight text-gray-900">
                  Cart
                </h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {products?.map((product) => (
                      <li key={product._id} className="flex py-6">
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
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty
                              </label>
                              <select
                                onChange={(e) => handleQuantity(e, product)}
                                value={product?.quantity}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>

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
                                  setOpenModal(product?.id);
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

              <div className="border-t border-gray-200 py-6  mt-5">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${totalAmount}</p>
                </div>
                <div className="flex justify-between text-base my-3 font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  <p>{totalItems} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <button onClick={handleOrder} className="w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 mt-6">
                  Order Now
                </button>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
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
        </div>
      </div>
      
    </>
  );
}

export default Checkout;
