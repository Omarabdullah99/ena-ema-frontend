import {configureStore} from "@reduxjs/toolkit"
import UserReducer from './features/UserSlice'
import ProductReducer from './features/ProductSlice'
import CartReducer from './features/CartSlice'
import OrderReducer from './features/OrderSlice'

export default configureStore({
    reducer:{
        users:UserReducer,
        product:ProductReducer,
        cart:CartReducer,
        orders:OrderReducer
    }
})