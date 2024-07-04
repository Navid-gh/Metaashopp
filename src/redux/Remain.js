import { createSlice } from "@reduxjs/toolkit";

export const remainSlice = createSlice({
    name:'remain',
    initialState:{remain:false},
    reducers:{
        changeRmn: (state,action) => {
            state.remain = action.payload
        }

        }
    }
)
export const {changeRmn} = remainSlice.actions;
export default remainSlice.reducer;