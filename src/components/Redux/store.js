// config with redux persist
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from "./authSlice"
import dataReducer from "./dataSlice"
import comboReducer from "./comboSlice"
import sieuTocReducer from "./sieuTocSlice"
import offerReducer from "./offerSlice"
import userReducer from "./userSlice"


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({
    auth: authReducer,
    data: dataReducer,
    combo: comboReducer,
    sieutoc: sieuTocReducer,
    offer: offerReducer,
    user: userReducer

});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store);