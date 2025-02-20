import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
  status: "idel",
  wishe: [],

};

export const createWishListAsync = createAsyncThunk(
  "wishes/createWishList",
  async (data) => {
    const response = await api.createWishList(data);
    // console.log("createorderasync",response.data)
    return response.data;
  }
);

export const fetchWishListByUserIdAsync = createAsyncThunk(
  "wishes/userWishList",
  async (userId) => {
    // console.log('slice user id',userId)
    const response = await api.getWishListByUserId(userId);
    // console.log('slice response',response)
    return response.data;
  }
);

export const deleteWishListAsync = createAsyncThunk(
  "wishes/deleteWishList",
  async (wishListId) => {
    // console.log('slice',wishListId)
    const response = await api.deleteWishListById(wishListId);
    return response.data;
  }
);

export const wishSlice = createSlice({
  name: "wishes",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWishListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createWishListAsync.fulfilled, (state, action) => {
        state.status = "fullfiled";
        state.wishe.push(action.payload);
      })
      .addCase(fetchWishListByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishListByUserIdAsync.fulfilled, (state, action) => {
        state.status = "fullfiled";
        state.wishe = action.payload;
        // console.log('user slice',action.payload)
      })
      .addCase(deleteWishListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWishListAsync.fulfilled, (state, action) => {
        // console.log('payload',action.payload)
        state.status = "fulfilled";
        const index = state.wishe.findIndex(
          (item) => item._id === action.payload._id
        );
        state.wishe.splice(index, 1);
      });
  },
});

export const selectedUserWishList = (state) => state.wishes.wishe;
export const selectedWishListStatus = (state) => state.wishes.status;
export default wishSlice.reducer;
