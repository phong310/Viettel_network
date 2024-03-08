import axios from "axios";
import { logOutFailed, logOutStart, logOutSuccess, loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "../Redux/authSlice";
import { getDataStart, getDataSuccess, getDataFaild } from "../Redux/dataSlice"
import { toast } from 'react-toastify';
import { getComboFaild, getComboStart, getComboSuccess } from "../Redux/comboSlice";
import { getSieuTocFaild, getSieuTocStart, getSieuTocSuccess } from "../Redux/sieuTocSlice";
import { getDataOfferFaild, getDataOfferStart, getDataOfferSuccess } from "../Redux/offerSlice";
import { getUserFaild, getUserStart, getUserSuccess } from "../Redux/userSlice";

const baseURL = import.meta.env.VITE_API_PRODUCTS;

// REGISTER
export const RegisterUser = async (newUser, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post(`${baseURL}auth/register`, newUser);
        dispatch(registerSuccess(res.data));
        navigate("/login");
        toast.success("Đăng ký tài khoản thành công")

    } catch (e) {
        dispatch(registerFailed());
        toast.error("Đăng ký không thành công !")
    }
}

// LOGIN 
export const LoginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(`${baseURL}auth/login`, user);
        dispatch(loginSuccess(res.data));
        navigate("/admin");
        toast.success("Đăng nhập thành công !")

    } catch (e) {
        dispatch(loginFailed());
        toast.error("Đăng nhập không thành công")
    }
}

// LOGOUT 
export const LogoutUser = async (id, dispatch, navigate, accessToken) => {
    dispatch(logOutStart());
    try {
        await axios.post(`${baseURL}auth/logout`, id, {
            headers: { token: `Bearer ${accessToken}` }
        })
        dispatch(logOutSuccess());
        navigate("/login")
        toast.success("Đăng xuất thành công")

    } catch (e) {
        dispatch(logOutFailed());
        toast.error("Đăng xuất không thành công")
    }
}

// GET ALL DATA NETWORK
export const getAllData = async (dispatch, accessToken) => {
    dispatch(getDataStart())
    try {
        const url = `${baseURL}data-network/getAll`
        const res = await axios.get(url, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getDataSuccess(res.data));
    } catch (e) {
        dispatch(getDataFaild());
        toast.error("Thất bại!");
    }
}

// GET ALL DATA COMBO
export const getALlCombo = async (dispatch, accessToken) => {
    dispatch(getComboStart());
    try {
        const url = `${baseURL}data-combo/getAllCombo`
        const res = await axios.get(url, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getComboSuccess(res.data));
    } catch (e) {
        dispatch(getComboFaild())
        toast.error("Thất bại!");
    }
}

// GET ALL DATA SIEU TOC
export const getALlSieuToc = async (dispatch, accessToken) => {
    dispatch(getSieuTocStart());
    try {
        const url = `${baseURL}data-sieu-toc/get-all`
        const res = await axios.get(url, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getSieuTocSuccess(res.data));
    } catch (e) {
        dispatch(getSieuTocFaild())
        toast.error("Thất bại!");
    }
}

// GET ALL DATA OFFER
export const getALlOffer = async (dispatch, accessToken) => {
    dispatch(getDataOfferStart());
    try {
        const url = `${baseURL}data-offer/get-all-offer`
        const res = await axios.get(url, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getDataOfferSuccess(res.data));
    } catch (e) {
        dispatch(getDataOfferFaild())
        toast.error("Thất bại!");
    }
}

// GET ALL USERS
export const getAllUser = async (dispatch, accessToken) => {
    dispatch(getUserStart())
    try {
        const url = `${baseURL}user-account/get-all`
        const res = await axios.get(url, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getUserSuccess(res.data))
    } catch (e) {
        dispatch(getUserFaild())
        toast.error("Thất bại!")
    }
}