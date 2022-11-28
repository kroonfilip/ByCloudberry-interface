import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Bag = {
    bagtype: string;
    color: string;
    comparisonData: number;
    graphdata: [{
        amount: number;
        color: string;
        type: string;
    }];
    name: string;
    _id: string;
};

const initialState: Bag = {
    bagtype: "",
    color: "",
    comparisonData: 0,
    graphdata: [{
        amount: 0,
        color: "",
        type: "",
    }],
    name: "",
    _id: "",
};


export const bagSlice = createSlice({
    name: "bag",
    initialState,
    reducers: {
        
        setBagState: (state, action) => {
            console.log("yoyo");
            Object.assign(state, action.payload);

            

            state = action.payload;

            console.log(state)
        },
    },
});

export const { setBagState } = bagSlice.actions;

export default bagSlice.reducer;