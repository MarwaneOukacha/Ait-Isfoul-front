import axios from "axios";
import KeycloakUtils from "./KeycloakUtils";
import { logout } from "../store/actions/loginAction";

// Global variables from window
export const api_url = window.API_URL;
export const enableCaptchaValidation = window.ENABLE_CAPTCHA_VALIDATION;

// Helper to create Axios instances
function initInstance() {
    return {
        baseURL: api_url,
    };
}

// Axios instances
const axiosInstance = axios.create(initInstance());
const axiosLogoutInstance = axios.create(initInstance());
export const axiosInstanceRefreshToken = axios.create({ baseURL: api_url });
export const axiosApplicationInstance = axios.create(initInstance());
export const axiosApplicationRefreshTokenInstance = axios.create({ baseURL: api_url });

// In-memory request cache
let conf = [];

// Endpoints that skip auth header
const skipHeaderEndPoint = [
    '/login',
    '/refresh-token',
    'logout',
    'customers/add'
];

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
    if (config.url && skipHeaderEndPoint.some((ep) => config.url.includes(ep))) {
        config.headers = null;
    } else {
       // const accessToken = KeycloakUtils.getAccessToken(); I will fix this to use my personal auth
        if (accessToken !== undefined) {
            config.headers = {
                ...config.headers,
                Authorization: "Bearer " + accessToken
            };
        }
    }

    conf[config.method + ":" + config.url] = { ...config };
    return Promise.resolve(config);
});

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalConfig = error.config;

        // If 401, attempt refresh
        if (originalConfig.url.indexOf("login") === -1 && error.response) {
            if (error.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const res = await axiosInstanceRefreshToken.post("/refresh-token", null, {
                        /*params: {
                            refreshToken: KeycloakUtils.getLocalRefreshToken() You should setUp it to get refresh token 
                        }*/
                    });
                    updateAccessTokenResponse(res.data);

                    // Retry original request
                    return axiosInstance(conf[originalConfig.method + ":" + originalConfig.url]);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);



// Store new access token
function updateAccessTokenResponse(accessTokenResponse) {
    KeycloakUtils.updateLocalAccessToken(accessTokenResponse);
}

export default axiosInstance;
