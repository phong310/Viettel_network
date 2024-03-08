import { createSlice } from '@reduxjs/toolkit'

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        dataNetworkList: {
            allData: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getDataStart: (state) => {
            state.dataNetworkList.isFetching = true
        },

        getDataSuccess: (state, actions) => {
            state.dataNetworkList.isFetching = false;
            state.dataNetworkList.allData = actions.payload;
            state.dataNetworkList.error = false;
        },

        getDataFaild: (state) => {
            state.dataNetworkList.isFetching = false;
            state.dataNetworkList.error = true;
        }

    }
})

export const { getDataStart, getDataSuccess, getDataFaild } = dataSlice.actions;

export default dataSlice.reducer;