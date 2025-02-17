import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api';

const initialState = {
    products: [],
    totalItems: 0,
    categories: [],
    brands: [],
    status: 'idle',
    selectedProduct: null,
  };

  export const fetchProductsByFiltersAsync = createAsyncThunk(
    'product/fetchProductsByFilters',
    async ({ filter, sort, pagination }) => {
      const response = await api.fetchProductsByFilters(filter, sort, pagination);
      return response.data;
    }
  );

  export const fetchAllCategoriesAsync=createAsyncThunk(
    'product/fetchAllCategories',
    async ()=>{
      const response= await api.fetchCategories()
      return response.data
    }
  
  )

  export const fetchAllBrandsAsync= createAsyncThunk(
    'product/fetchAllBrand',
    async()=>{
      const response= await api.fetchBrands()
      return response.data

    }
  )


  export const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(fetchProductsByFiltersAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.products = action.payload.products;
          state.totalItems = action.payload.totalItems;
        })
        .addCase(fetchAllCategoriesAsync.pending, (state)=>{
            state.status= 'loading'
          })
          .addCase(fetchAllCategoriesAsync.fulfilled, (state,action)=>{
            state.categories= action.payload
          })
          .addCase(fetchAllBrandsAsync.pending, (state)=>{
            state.status= 'loading'
          })
          .addCase(fetchAllBrandsAsync.fulfilled, (state,action)=>{
            state.brands= action.payload
          })
    },
  });


  export const selectAllProducts = (state) => state.product.products;
  export const selectTotalItems  = (state) => state.product.totalItems;
  export const selectProductStatus=(state)=> state.product.status
  export const selectAllCategories= (state) => state.product.categories
  export const selectAllBrands= (state)=> state.product.brands
  export const selectedProduct=(state)=> state.product.selectedProduct
 export default productSlice.reducer