import createMiddleware from "./clientMiddleware";
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { applyMiddleware, createStore as _createStore } from "redux";
import reducer from "../store/reducers/reducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const storeCreator = (client) => {
    console.log(client);
    const middleware = [
        createMiddleware(client),
        loadingBarMiddleware({ promiseTypeSuffixes: ["REQUEST", "SUCCESS", "FAIL"] })
    ];

    const finalCreateStore = composeWithDevTools(
        applyMiddleware(...middleware)
    )(_createStore);

    return finalCreateStore(reducer
        // ,persistedState
    );
};

export default storeCreator;
