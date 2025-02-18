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