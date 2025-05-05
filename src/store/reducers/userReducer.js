import * as TYPE from '../types/userTypes'; // Adjust the path as needed
import * as LoadingMessages from '../constants/loadingMessages'; // Adjust if needed

const initialState = {
  page: {},
  pageable: {},
  userDetails: {},
  loading: false,
  loaded: false,
  error: null,
  loadingMessage: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.USER_SEARCH:
      return {
        ...state,
        pageable: { ...state.pageable },
        loading: true,
        loaded: false,
        loadingMessage: LoadingMessages.QUERY_PROCESS
      };
    case TYPE.USER_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        loadingMessage: LoadingMessages.DATA_LOADING_SUCCESS,
        page: { ...action.result.data.content },
        pageable: {
          ...action.result.data.pageable,
          totalElements: action.result.data.totalElements,
          totalPages: action.result.data.totalPages
        },
        error: null
      };
    case TYPE.USER_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        loadingMessage: LoadingMessages.DATA_LOADING_FAILED,
        error: action.error?.response?.data?.detailedErrorCode
      };

    case TYPE.ADD_USER:
      return {
        ...state,
        loading: true,
        loaded: false,
        loadingMessage: LoadingMessages.QUERY_PROCESS
      };
    case TYPE.ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      };
    case TYPE.ADD_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error?.response?.data?.detailedErrorCode
      };

    case TYPE.EDIT_USER:
      return {
        ...state,
        loading: true,
        loaded: false,
        loadingMessage: LoadingMessages.QUERY_PROCESS
      };
    case TYPE.EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      };
    case TYPE.EDIT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error?.response?.data?.detailedErrorCode
      };

    case TYPE.USER_DETAILS:
      return {
        ...state,
        loading: true,
        loaded: false,
        loadingMessage: LoadingMessages.QUERY_PROCESS
      };
    case TYPE.USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: { ...action.result.data },
        loading: false,
        loaded: true,
        error: null
      };
    case TYPE.USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error?.response?.data?.detailedErrorCode
      };

    default:
      return { ...state };
  }
}
