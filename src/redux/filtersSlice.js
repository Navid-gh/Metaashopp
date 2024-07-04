import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name:'filter',
    initialState:[
        {}
    ],
    reducers:{
        updateFilter: (state,action) => {
            state[0] = action.payload[0];
        },

        }
    }
)
export const {updateFilter} = filterSlice.actions;
export default filterSlice.reducer;