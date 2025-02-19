import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from '../api';

const initialState={
    status:'idel',
    orders:[],
    totalItems:0,
    currentOrder:null,
    userOrders:[],
}

export const createOrderAsync=createAsyncThunk(
    'orders/createorder',
    async(order)=>{
        const response= await api.createOrder(order)
        console.log("createorderasync",response.data)
        return response.data

       
    }
)

export const fetchOrdersByUserIdAsync=createAsyncThunk(
    'user/userOrders',
    async(userId)=>{
        // console.log('slice user id',userId)
        const response= await api.fectOrderByUserId(userId)
        // console.log('slice response',response)
        return response.data
    }
)

// export const updateOrderAsync=createAsyncThunk(
//     'order/updateOrder',
//     async(order)=>{
//         const response= await updateOrder(order)
//         return response.data
//     }
// )

// export const fetchAllOrdersAsync=createAsyncThunk(
//     'order/fetchAllOrders',
//     async(pagination)=>{
//         const response= await fetchAllOrders(pagination)
//         return response.data
//     },
    
// )

export const ordersSlice= createSlice({
    name:'orders',
    initialState,
    reducers: {
        resetOrder: (state) => {
          state.currentOrder = null;
        },
      },
    extraReducers: (builder) => {
        builder
        .addCase(createOrderAsync.pending, (state)=>{
            state.status= 'loading'
        })
        .addCase(createOrderAsync.fulfilled, (state,action)=>{
            state.status= 'fullfiled'
            state.orders.push(action.payload)
            state.currentOrder= action.payload
        })
        .addCase(fetchOrdersByUserIdAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchOrdersByUserIdAsync.fulfilled, (state,action)=>{
            state.status='fullfiled'
            state.userOrders= action.payload
            // console.log('user slice',action.payload)
          })
        // .addCase(fetchAllOrdersAsync.pending,(state)=>{
        //     state.status='loading'
        // })
        // .addCase(fetchAllOrdersAsync.fulfilled,(state,action)=>{
        //     state.status= 'fullfiled'
        //     state.orders= action.payload.orders
        //     state.totalItems= action.payload.totalItems
        // })

        // .addCase(updateOrderAsync.pending, (state) => {
        //     state.status = 'loading';
        //   })
        //   .addCase(updateOrderAsync.fulfilled, (state, action) => {
        //     state.status = 'idle';
        //     const index =  state.orders.findIndex(order=>order.id===action.payload.id)
        //     state.orders[index] = action.payload;
        //   })
        
    }
})

export const { resetOrder } = ordersSlice.actions;
export const selectCurrentOrder=(state)=>state.orders.currentOrder
export const selectOrderStatus=(state)=>state.orders.status
export const selectAllOrders=(state)=> state.orders.orders
export const selectTotalItemOrder=(state)=> state.orders.totalItems
export const selectedUserOrders=(state)=> state.orders.userOrders
export default ordersSlice.reducer