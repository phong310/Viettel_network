import { createSlice } from '@reduxjs/toolkit'

const offerSlice = createSlice({
    name: 'offer',
    initialState: {
        dataOfferList: {
            allData: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getDataOfferStart: (state) => {
            state.dataOfferList.isFetching = true
        },

        getDataOfferSuccess: (state, actions) => {
            state.dataOfferList.isFetching = false;
            state.dataOfferList.allData = actions.payload;
            state.dataOfferList.error = false;
        },

        getDataOfferFaild: (state) => {
            state.dataOfferList.isFetching = false;
            state.dataOfferList.error = true;
        }

    }
})

export const { getDataOfferStart, getDataOfferSuccess, getDataOfferFaild } = offerSlice.actions;

export default offerSlice.reducer;