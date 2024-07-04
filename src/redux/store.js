import { configureStore } from "@reduxjs/toolkit";
import filterReducer from './filtersSlice';
import RngReducer from './priceRngSlice';
import remaninReducer from './Remain';
import CartReducer from './CartSlice';
import wishReducer from './wishSlice';
import userRdeucer from './user'

export default configureStore({
    reducer:{
        filter:filterReducer,
        priceRng:RngReducer,
        rmain:remaninReducer,
        Cart:CartReducer,
        wish:wishReducer,
        user:userRdeucer
    }
})