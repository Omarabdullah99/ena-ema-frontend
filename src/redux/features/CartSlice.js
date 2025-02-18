import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
  status: "idel",
  item: [],
};

export const createCartByAsync = createAsyncThunk(
  "cart/addToCart",
  async (data) => {
    const response = await api.createCart(data);
    return response.data;
  }
);

export const getCartItemByUserIdAsync=createAsyncThunk(
    'cart/getCartItemByUserId',
    async(userId)=>{
      // console.log('sliceuserId',userId)
        const response= await api.getCartItemByUserId(userId)
        // console.log(response.data)
        return response.data

    }
)

export const deleteCartItemAsync=createAsyncThunk(
  'cart/deleteCartItem',
  async(cartId)=>{
      const response= await api.deleteCart(cartId)
      return response.data

  }
)

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(createCartByAsync.pending, (state)=>{
        state.status= 'loading'
    })
    .addCase(createCartByAsync.fulfilled, (state,action)=>{
        state.status='fulfilled',
        state.item.push(action.payload)
    })
    .addCase(getCartItemByUserIdAsync.pending, (state)=>{
        state.status='loading'
    })
    .addCase(getCartItemByUserIdAsync.fulfilled, (state,action)=>{
        state.status= 'fulfiled',
        state.item = action.payload
    })
    .addCase(deleteCartItemAsync.pending,(state)=>{
      state.status='loading'
  })
  .addCase(deleteCartItemAsync.fulfilled, (state,action)=>{
    console.log('delete action', action.payload)
      state.status='fulfilled';
      const index= state.item.findIndex(item => item._id === action.payload._id)
      state.item.splice(index,1)
  })
  },
});

export const selectedCartItemByUserId = (state) => state.cart.item;
export const selectedCartStatus = (state) => state.cart.status;
export default cartSlice.reducer;
