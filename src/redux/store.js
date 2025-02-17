import {configureStore} from "@reduxjs/toolkit"
import UserReducer from './features/UserSlice'
import ProductReducer from './features/ProductSlice'

export default configureStore({
    reducer:{
        users:UserReducer,
        product:ProductReducer
       
    }
})