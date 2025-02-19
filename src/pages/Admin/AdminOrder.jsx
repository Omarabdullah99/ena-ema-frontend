import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { PencilIcon, EyeIcon } from "@heroicons/react/24/outline";

import {
  fetchAllOrdersAsync,
  selectAllOrders,
  selectOrderStatus,
  selectTotalItemOrder,
  updateOrderAsync,
} from "../../redux/features/OrderSlice";

function AdminOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const totalOrderItems = useSelector(selectTotalItemOrder);
  const orderStatus = useSelector(selectOrderStatus);

  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [selectedStatus, setSelectedStatus] = useState(""); // নতুন স্টেট
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.ceil(totalOrderItems / ITEMS_PER_PAGE);

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, page]);

  const handleEdit = (order) => {
    setEditableOrderId(order._id);
    setSelectedStatus(order.orderstatus); // আগের স্ট্যাটাস সেট করো
  };

  const handleUpdate = (e, order) => {
    e.preventDefault();
    console.log("Selected value:", e.target.value);
    const updatedOrder = { ...order, orderstatus: e.target.value };
    console.log("handleUpdate", updatedOrder);
    dispatch(updateOrderAsync(updatedOrder)); 
    setEditableOrderId(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "processing":
        return "bg-purple-200 text-purple-600";
      case "shipped":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "confirmed":
        return "bg-orange-200 text-orange-600";
      default:
        return "bg-red-200 text-red-600";
    }
  };

  const handlePage = (page) => {
    setPage(page);
  };

  if (orderStatus === "loading") {
    return <h1 className="text-6xl">Loading...</h1>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Order#</th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th className="py-3 px-6 text-center">Total Amount</th>
                  <th className="py-3 px-6 text-center">Shipping Address</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders?.map((order) => (
                  <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <span className="font-medium">{order._id}</span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order?.items?.map((item, index) => (
                        <div key={index} className="flex items-center my-3">
                          <img className="w-6 h-6 rounded-full mr-2" src={item.product.thumbnail} alt="item" />
                          <span>
                            {item.product.title} - #quantity:{item.quantity}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">${order.totalAmount}</td>
                    <td className="py-3 px-6 text-center">
                      <div>
                        <strong>{order.selectedAddress.name}</strong>,
                        <div>{order.selectedAddress.street}</div>
                        <div>{order.selectedAddress.city}</div>
                        <div>{order.selectedAddress.zip}</div>
                        <div>{order.selectedAddress.number}</div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {order._id === editableOrderId ? (
                        <select
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          onBlur={(e) => handleUpdate(e, order)}
                        >
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="confirmed">Confirmed</option>
                        </select>
                      ) : (
                        <span className={`${chooseColor(order?.orderstatus)} py-1 px-3 rounded-full text-xs`}>
                          {order?.orderstatus}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <EyeIcon className="w-8 h-8 mr-4 cursor-pointer hover:text-purple-500" />
                        <PencilIcon className="w-8 h-8 cursor-pointer hover:text-purple-500" onClick={() => handleEdit(order)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <p className="text-sm text-gray-700">
                Showing {(page - 1) * ITEMS_PER_PAGE + 1} to {page * ITEMS_PER_PAGE} of {totalOrderItems} results
              </p>
              <nav className="inline-flex -space-x-px rounded-md shadow-sm">
                <button onClick={() => handlePage(page > 1 ? page - 1 : page)} className="px-2 py-2 text-gray-400 hover:bg-gray-50">
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePage(index + 1)}
                    className={`px-4 py-2 text-sm font-semibold ${index + 1 === page ? "bg-indigo-600 text-white" : "text-gray-400"}`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button onClick={() => handlePage(page < totalPages ? page + 1 : page)} className="px-2 py-2 text-gray-400 hover:bg-gray-50">
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
