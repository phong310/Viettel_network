import { createSlice } from '@reduxjs/toolkit'

const sieuTocSlice = createSlice({
    name: 'sieutoc',
    initialState: {
        dataSieuTocList: {
            allData: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getSieuTocStart: (state) => {
            state.dataSieuTocList.isFetching = true
        },

        getSieuTocSuccess: (state, actions) => {
            state.dataSieuTocList.isFetching = false;
            state.dataSieuTocList.allData = actions.payload;
            state.dataSieuTocList.error = false;
        },

        getSieuTocFaild: (state) => {
            state.dataSieuTocList.isFetching = false;
            state.dataSieuTocList.error = true;
        }

    }
})

export const { getSieuTocStart, getSieuTocSuccess, getSieuTocFaild } = sieuTocSlice.actions;

export default sieuTocSlice.reducer;