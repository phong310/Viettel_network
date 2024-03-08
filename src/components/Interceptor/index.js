import axios from "axios";
import jwt_decode from "jwt-decode";

const baseURL = import.meta.env.VITE_API_LOCAL;

const refreshToken = async () => {
    try {
        const res = await axios.post(`${baseURL}auth/refresh`, {}, { withCredentials: true });
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            config.withCredentials = true;
            let date = new Date();
            const decodedToken = jwt_decode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                try {
                    const data = await refreshToken();
                    const refreshUser = {
                        ...user,
                        accessToken: data.accessToken,
                    };
                    dispatch(stateSuccess(refreshUser));
                    config.headers["token"] = `Bearer ${data.accessToken}`;
                } catch (err) {
                    console.error("Refresh token failed:", err);
                }
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    return newInstance;
};
