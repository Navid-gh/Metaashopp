import { createSlice } from "@reduxjs/toolkit";

export const wishSlice = createSlice({
    name:'wish',
    initialState:{
        products:[]
    },
    reducers:{
        setWish: (state,action) => {
            state.products = action.payload
        },
        updateFilter: (state,action) => {
            if(state.products.find(item=>item._id === action.payload.id)){
                state =  state.products.filter(item=>item._id !== action.payload.id)
            }else{
                state.products.push(action.payload.product)
            }
        }
        }
    }
)
export const {updateFilter, setWish} = wishSlice.actions;
export default wishSlice.reducer;