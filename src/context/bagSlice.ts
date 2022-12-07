import { createSlice } from "@reduxjs/toolkit";

export type Bag = {
    bagtype: string;
    color: string;
    comparisonData: number;
    graphdata: [
        {amount: number;color: string;type: string;},
        {amount: number;color: string;type: string;},
        {amount: number;color: string;type: string;},
        {amount: number;color: string;type: string;},
        {amount: number;color: string;type: string;},
        {amount: number;color: string;type: string;},
        {amount: number;color: string;type: string;},
    ];
    name: string;
    _id: string;

    transparencyData: [{
        /* EXEMPEL PÅ OBJEKT */
        value1: number;
        value2: number;
        value3: number;
        value4: number;
    }]
};

const initialState: Bag = {
    bagtype: "",
    color: "",
    comparisonData: 0,
    graphdata: [
        {amount: 0,color: "",type: "",},
        {amount: 0,color: "",type: "",},
        {amount: 0,color: "",type: "",},
        {amount: 0,color: "",type: "",},
        {amount: 0,color: "",type: "",},
        {amount: 0,color: "",type: "",},
        {amount: 0,color: "",type: "",},
    ],
    name: "",
    _id: "",

    transparencyData: [{
        value1: 0,
        value2: 0,
        value3: 0,
        value4: 0,
    }]
};


export const bagSlice = createSlice({
    name: "bag",
    initialState,
    reducers: {
        
        setBagState: (state, action) => {
            Object.assign(state, action.payload);
            state.bagtype = action.payload.bagtype;
            state.color = action.payload.color;
            state.comparisonData = action.payload.comparisonData;
            state.name = action.payload.name;
            state._id = action.payload._id;
            console.log(state.name)

        },
        editGraphData: (state, action) => {
            state.graphdata = action.payload;
        },
        editTransparencyData: (state, action) => {
            state.transparencyData = action.payload;
        },
    },
});

export const { setBagState } = bagSlice.actions;
export const { editGraphData } = bagSlice.actions;
export const { editTransparencyData } = bagSlice.actions;

export default bagSlice.reducer;