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
},
setUpdateNotate(state,action) {
    state.notations = action.payload
}
    }
})
export const {setDone,setNotDone,setNotate,setUpdateNotate} = notationSlice.actions
export default notationSlice.reducer;