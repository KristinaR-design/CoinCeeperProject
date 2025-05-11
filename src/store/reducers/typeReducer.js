import { FETCH_TYPES, ADD_TYPE, UPDATE_TYPE, DELETE_TYPE } from "../actions/typeActions";

const initialState = {
    data: [],
    loading: false,
    error: null
};

export const typeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TYPES:
            return { ...state, data: action.payload };

        case ADD_TYPE:
            return { ...state, data: [...state.data, action.payload] };

        case UPDATE_TYPE:
            console.log('Updating Type:', action.payload); // Логирование данных
            return {
                ...state,
                data: state.data.map((type) =>
                    type.id === action.payload.id ? action.payload : type
                )
            };
            

        case DELETE_TYPE:
            return {
                ...state,
                data: state.data.filter((type) => type.id !== action.payload)
            };

        default:
            return state;
    }
};
