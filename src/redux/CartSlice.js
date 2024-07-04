import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name:'cart',
    initialState:{
        products:[],
        qty:0,
        total:0
    },
    reducers:{
        addCart: (state,action) => {
            state.products.push(action.payload);
            state.qty += 1;
            state.total += action.payload.theFinalPrice * action.payload.quantity;
            localStorage.setItem("cartProducts",JSON.stringify(state.products));
        },
        addQty: (state,action) => {
            state.products[action.payload.idx].quantity += 1;
            state.total += action.payload.price;
            localStorage.setItem("cartProducts",JSON.stringify(state.products));
        },
        decQty: (state,action) => {
            state.products[action.payload.idx].quantity -= 1;
            state.total -= action.payload.price;
            localStorage.setItem("cartProducts",JSON.stringify(state.products));
        },
        removeProduct: (state,action) => {
            state.products = 
            state.products.filter(item=>item.id !== action.payload.id || item.color !== action.payload.color);
            state.qty -= 1;
            state.total -= action.payload.price * action.payload.qty;
            localStorage.setItem("cartProducts",JSON.stringify(state.products));
        },
        updateProduct: (state,action) => {
            state.products = 
            action.payload.products;
            state.qty = action.payload.qty;
            state.total = action.payload.price;
        },

        }
    }
)
export const {addCart,addQty,decQty,removeProduct,updateProduct} = cartSlice.actions;
export default cartSlice.reducer;