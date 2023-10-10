import { createSlice } from "@reduxjs/toolkit";

const notationSlice = createSlice({
    name:'notate',
    initialState:{
        notations: [],
        done:[],
        notdone:[]
    },
    reducers: {
setNotate(state,action) {
state.notations = [...state.notations,action.payload]
},
setDone(state,action) {
    state.done = [...state.done,...action.payload]
},
setNotDone(state,action) {
    state.notdone = [...state.notdone,...action.payload]
}
    }
})
export const {setDone,setNotDone,setNotate} = notationSlice.actions
export default notationSlice.reducer;