import TYPE from "./types"; // replace with your actual type constants
import axios from "../../utils/axiosInstance"; // your configured axios instance

export function login(credentials) {
    return {
        types: [TYPE.LOGIN, TYPE.LOGIN_SUCCESS, TYPE.LOGIN_FAIL],
        promise: (client) => client.post("/login", {
            email: credentials.email,
            password: credentials.password
        })
    };
}

export function refreshToken(refreshToken) {
    return {
        types: [TYPE.REFRESH_TOKEN, TYPE.REFRESH_TOKEN_SUCCESS, TYPE.REFRESH_TOKEN_FAIL],
        promise: (client) => client.post(`/refresh-token?refreshToken=${refreshToken}`)
    };
}
