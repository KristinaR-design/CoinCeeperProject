import { FETCH_ACCOUNTS, ADD_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT } from "../actions/accountActions";

const initialState = {
    items: [],
    loading: false,
    error: null
  };
  
  export const accountReducer = (state = initialState, action) =>{
    switch (action.type) {
      case FETCH_ACCOUNTS:
        return {
          ...state,
          items: action.payload,
          loading: false,
          error: null
        };
  
      case ADD_ACCOUNT:
        return {
          ...state,
          items: [...state.items, action.payload]
        };
  
      case UPDATE_ACCOUNT:
        return {
          ...state,
          items: state.items.map(account =>
            account.id === action.payload.id ? action.payload : account
          )
        };
  
      case DELETE_ACCOUNT:
        return {
          ...state,
          items: state.items.filter(account => account.id !== action.payload)
        };
  
      default:
        return state;
    }
  };