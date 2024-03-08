import { createSlice } from '@reduxjs/toolkit'

const comboSlice = createSlice({
    name: 'combo',
    initialState: {
        dataComboList: {
            allData: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getComboStart: (state) => {
            state.dataComboList.isFetching = true
        },

        getComboSuccess: (state, actions) => {
            state.dataComboList.isFetching = false;
            state.dataComboList.allData = actions.payload;
            state.dataComboList.error = false;
        },

        getComboFaild: (state) => {
            state.dataComboList.isFetching = false;
            state.dataComboList.error = true;
        }

    }
})

export const { getComboStart, getComboSuccess, getComboFaild } = comboSlice.actions;

export default comboSlice.reducer;