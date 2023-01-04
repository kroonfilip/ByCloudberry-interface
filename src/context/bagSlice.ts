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

    transparency: {
    bottomColor: string;
    topColor: string;
    onlineSEK: number;
    onlineEUR: number;
    retailSEK: number;
    retailEUR: number;
    }

}

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

    transparency: {
    bottomColor: "",
    topColor: "",
    onlineSEK: 0,
    onlineEUR: 0,
    retailSEK: 0,
    retailEUR: 0,
    }

}


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

            state.transparency = action.payload.transparency;

            console.log(state.transparency)
            

        },
        editGraphData: (state, action) => {
            state.graphdata = action.payload;
        },
        editTransparencyData: (state, action) => {
            state.transparency.bottomColor = action.payload.bottomColor;
            state.transparency.topColor = action.payload.topColor;
            state.transparency.onlineSEK = action.payload.onlineSEK;
            state.transparency.onlineEUR = action.payload.onlineEUR;
            state.transparency.retailSEK = action.payload.retailSEK;
            state.transparency.retailEUR = action.payload.retailEUR;
        },
        editComparisonData: (state, action) => {
            state.comparisonData = action.payload;
            console.log(state.comparisonData)
        },
        
    },
});

export const { setBagState } = bagSlice.actions;
export const { editGraphData } = bagSlice.actions;
export const { editTransparencyData } = bagSlice.actions;
export const {editComparisonData} = bagSlice.actions;

export default bagSlice.reducer;