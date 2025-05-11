import { FETCH_HISTORY_REQUEST,
        FETCH_HISTORY,
        FETCH_HISTORY_FAILURE,
        CREATE_HISTORY,
        UPDATE_HISTORY,
        DELETE_HISTORY,
        FETCH_LAST_FIVE_HISTORY,
        FETCH_BY_DATE_RANGE,
} from "../actions/historyActions";

const initialState = {
    data: [],
    lastFive: [],
    loading: false,
    error: null,
};

export const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_HISTORY_REQUEST:
            return { ...state, loading: true };

        case FETCH_HISTORY:
            return { ...state, loading: false, data: action.payload };

        case FETCH_HISTORY_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case CREATE_HISTORY:
            return { ...state, data: [...state.data, action.payload] };

        case UPDATE_HISTORY:
            return {
                ...state,
                data: state.data.map((item) =>
                item.id === action.payload.id ? action.payload : item),
            };

        case DELETE_HISTORY:
            return {
                ...state,
                data: state.data.filter((item) => item.id !== action.payload),
            };

        case FETCH_LAST_FIVE_HISTORY:
            return { ...state, lastFive: action.payload };

        case FETCH_BY_DATE_RANGE:
            return { ...state, data: action.payload };

        default:
            return state;
    };
}