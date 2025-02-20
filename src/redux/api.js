import axios from "axios";

// backend url latest working:https://blog-backend-luim.onrender.com
//backend url previous working:https://blog-server-last-test.vercel.app

const API = axios.create({ baseURL: "http://localhost:5000" });

//User Related api
export const signUp = (formValue) => API.post("/users/createUser", formValue); //*like Register
export const signIn = (formValue) => API.post("/users/login", formValue); //*like Register
export const findUserId = (userId) => API.get(`/users/findUserById/${userId}`);

// Product Related api
export const fetchProductsByFilters = (filter, sort, pagination) => {
  let queryString = "";

  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return API.get(`/products/fetchProducts?${queryString}`).then((response) => {
    const totalItems = response.headers.get("X-Total-Count");
    // console.log("total-res", totalItems);
    return { data: { products: response.data, totalItems: +totalItems } };
  });
};

export const fetchCategories = () => API.get("/category/allCategory");
export const fetchBrands = () => API.get("/brand/allbrands");
export const fetchProductById = (productId) => API.get(`/products/productById/${productId}`);


// AddToCart Related api
export const createCart=(data)=> API.post('/cart/createCart',data)
export const getCartItemByUserId=(userId)=> API.get(`/cart/cartByUserId/${userId}`)
export const deleteCart=(cartId)=>API.delete(`/cart/deleteCart/${cartId}`)
export const updateCartItem=(update)=> API.put(`/cart/updateCart/${update.id}`, update)

//Order Related api

export const createOrder=(order)=>API.post('/order/createOrder',order)
export const fectOrderByUserId=(userId)=>API.get(`/order/orderByUserId/${userId}`)


//admin related api
export const createProduct=(product)=> API.post('/products/createProduct',product)
export const updateProduct = (update)=> API.patch(`/products/updateProduct/${update.id}`,update)

export const fetchAllOrders=(pagination)=>{
  let queryString = "";

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return API.get(`/order/allOrder?${queryString}`).then((response) => {
    const totalItems = response.headers.get("X-Total-Count");
    // console.log("total-res", totalItems);
    return { data: { orders: response.data, totalItems: +totalItems } };
  });
}

export const updateOrder=(order)=>API.patch(`/order/updateOrderById/${order._id}`,order)

//wishList related api
export const createWishList=(data)=> API.post('/wishList/createWishList',data)
export const getWishListByUserId=(userId)=>API.get(`/wishList/wishListByUserId/${userId}`)
export const deleteWishListById=(wishListId)=>API.delete(`/wishList/deleteWishList/${wishListId}`)


