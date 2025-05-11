import axios from "axios";

export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';

const BASE_URL = 'https://681a187b1ac115563507c648.mockapi.io/accounts';
const getUserId = () => localStorage.getItem('user_id');

export const fetchAccounts = () => async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}?user_id=${getUserId()}`, {
        withCredentials: false
      });
      dispatch({ type: FETCH_ACCOUNTS, payload: response.data });
    } catch (error) {
      if (error.response?.status === 404) {
        dispatch({ type: FETCH_ACCOUNTS, payload: [] }); 
      } else {
        console.error("Ошибка при загрузке аккаунтов:", error);
      }
    }
  };
  

  export const addAccount = (data) => async (dispatch) => {
    try {
      const payload = { ...data, user_id: Number(getUserId()) };
      const response = await axios.post(BASE_URL, payload, {
        withCredentials: false
      });
      dispatch({ type: ADD_ACCOUNT, payload: response.data });
    } catch (error) {
      console.error("Ошибка при добавлении аккаунта:", error);
    }
  };
  
  export const updateAccount = (id, updatedData) => async (dispatch) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, updatedData, {
        withCredentials: false
      });
      dispatch({ type: UPDATE_ACCOUNT, payload: response.data });
    } catch (error) {
      console.error("Ошибка при обновлении аккаунта:", error);
    }
  };
  
  export const deleteAccount = (id) => async (dispatch) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        withCredentials: false
      });
      dispatch({ type: DELETE_ACCOUNT, payload: id });
    } catch (error) {
      console.error("Ошибка при удалении аккаунта:", error);
    }
  };  