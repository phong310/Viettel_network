import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'users',
    initialState: {
        userList: {
            userData: null,
            isFetching: false,
            error: false,
        }
    },
    reducers: {
        getUserStart: (state) => {
            state.userList.isFetching = true
        },

        getUserSuccess: (state, actions) => {
            state.userList.isFetching = false;
            state.userList.userData = actions.payload;
            state.userList.error = false;
        },

        getUserFaild: (state) => {
            state.userList.isFetching = false;
            state.userList.error = true
        }
    }
})

export const { getUserStart, getUserSuccess, getUserFaild } = userSlice.actions;
export default userSlice.reducer