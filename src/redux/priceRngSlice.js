import { createSlice } from "@reduxjs/toolkit";

export const priceRngSlice = createSlice({
    name:'priceRng',
    initialState:[0,1],
    reducers:{
        updateRng: (state,action) => {
            state[0] = action.payload[0]
            state[1] = action.payload[1]
        }

        }
    }
)
export const {updateRng} = priceRngSlice.actions;
export default priceRngSlice.reducer;