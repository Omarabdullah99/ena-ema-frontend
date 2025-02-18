import {configureStore} from "@reduxjs/toolkit"
import UserReducer from './features/UserSlice'
import ProductReducer from './features/ProductSlice'
import CartReducer from './features/CartSlice'

export default configureStore({
    reducer:{
        users:UserReducer,
        product:ProductReducer,
        cart:CartReducer
    }
})