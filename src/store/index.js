import axiosInstance from "../helpers/ApiClient";
import storeCreator from "../middlewares/storeCreator";

export const store = storeCreator(axiosInstance);

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
