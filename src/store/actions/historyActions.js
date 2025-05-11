import axios from "axios";

const BASE_URL = 'https://681a1a731ac115563507cf15.mockapi.io/history';
const getUserId = () => localStorage.getItem('user_id');

export const FETCH_HISTORY_REQUEST = 'FETCH_HISTORY_REQUEST';
export const FETCH_HISTORY = 'FETCH_HISTORY';
export const FETCH_HISTORY_FAILURE = 'FETCH_HISTORY_FAILURE';

export const CREATE_HISTORY = 'CREATE_HISTORY';
export const UPDATE_HISTORY = 'UPDATE_HISTORY';
export const DELETE_HISTORY = 'DELETE_HISTORY';
export const FETCH_LAST_FIVE_HISTORY = 'FETCH_LAST_FIVE_HISTORY';
export const FETCH_BY_DATE_RANGE = 'FETCH_BY_DATE_RANGE';

export const fetchHistory = () => async (dispatch) => {
    dispatch({ type: FETCH_HISTORY_REQUEST });
  
    try {
      const userId = getUserId();
      const response = await axios.get(`${BASE_URL}?user_id=${userId}`, {
        withCredentials: false
      });
      dispatch({ type: FETCH_HISTORY, payload: response.data });
    } catch (error) {
      if (error.response?.status === 404) {
        dispatch({ type: FETCH_HISTORY, payload: [] });
      } else {
        dispatch({ type: FETCH_HISTORY_FAILURE, payload: error.message });
      }
    }
  };
  

export const createHistory = (data) => async (dispatch) => {
    const userId = getUserId();
    const payload = { ...data, user_id: Number(userId) };
    try {
        const response = await axios.post(BASE_URL, payload, {
            withCredentials: false
        });
        dispatch({ type: CREATE_HISTORY, payload: response.data });
    } catch (error) {
        console.error("Ошибка при создании записи:", error);
    }
};

export const updateHistory = (id, updatedData) => async (dispatch) => {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData, {
        withCredentials: false
    });
    dispatch({ type: UPDATE_HISTORY, payload: response.data });
};

export const deleteHistory = (id) => async (dispatch) => {
    await axios.delete(`${BASE_URL}/${id}`, {
        withCredentials: false
    });
    dispatch({ type: DELETE_HISTORY, payload: id });
};

export const fetchHistoryByDateRange = (startDate, endDate) => async (dispatch) => {
    const userId = getUserId();
    const response = await axios.get(`${BASE_URL}?user_id=${userId}`, {
        withCredentials: false
    });
    const filtered = response.data.filter(entry => {
        const date = new Date(entry.date);
        return date >= new Date(startDate) && date <= new Date(endDate);
    });
    dispatch({ type: FETCH_BY_DATE_RANGE, payload: filtered });
};