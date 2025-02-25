import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
  products: [],
  totalItems: 0,
  categories: [],
  brands: [],
  status: "idle",
  selectedProduct: null,
};


export const createProductAsync=createAsyncThunk(
  'product/createproduct',
  async(product)=>{
    const response= await api.createProduct(product)
    return response.data
  }
)

export const updateProductAsync=createAsyncThunk(
  'product/updateProduct',
  async(update)=>{
    const response= await api.updateProduct(update)
    return response.data

  }
)

export const deleteProductAsync=createAsyncThunk(
  'product/deleteProduct',
  async(id)=>{
      const response= await api.deleteProduct(id)
      return response.data

  }
)

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({ filter, sort, pagination }) => {
    const response = await api.fetchProductsByFilters(filter, sort, pagination);
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (productId) => {
    console.log('productid',productId)
    const response = await api.fetchProductById(productId);
    return response.data;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  "product/fetchAllCategories",
  async () => {
    const response = await api.fetchCategories();
    return response.data;
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  "product/fetchAllBrand",
  async () => {
    const response = await api.fetchBrands();
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(createProductAsync.pending, (state)=>{
        state.status= 'loading'
    })
    .addCase(createProductAsync.fulfilled, (state,action)=>{
        state.status='fulfilled',
        state.products.push(action.payload)
    })
    .addCase(updateProductAsync.pending, (state)=>{
      state.status= 'loading'
  })
  .addCase(updateProductAsync.fulfilled, (state,action)=>{
      state.status= 'fulfilled';
      const index= state.products.findIndex(product => product._id === action.payload._id)
      // console.log('finde index slice.jsx', index)
      // console.log('action slice.jsx', action.payload)
      state.products[index]= action.payload
  })
      .addCase(deleteProductAsync.pending,(state)=>{
        state.status='loading'
    })
    .addCase(deleteProductAsync.fulfilled, (state,action)=>{
      console.log('delete action', action.payload)
        state.status='fulfilled';
        const index= state.products.findIndex(item => item._id === action.payload._id)
        state.products.splice(index,1)
    })
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectProductStatus = (state) => state.product.status;
export const selectAllCategories = (state) => state.product.categories;
export const selectAllBrands = (state) => state.product.brands;
export const selectedProduct = (state) => state.product.selectedProduct;
export default productSlice.reducer;
