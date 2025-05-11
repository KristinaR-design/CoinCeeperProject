import axios from "axios";

export const FETCH_TYPES = 'FETCH_TYPES';
export const ADD_TYPE = 'ADD_TYPE';
export const UPDATE_TYPE = 'UPDATE_TYPE';
export const DELETE_TYPE = 'DELETE_TYPE';

const BASE_URL = 'https://681a187b1ac115563507c648.mockapi.io/types';
const getUserId = () => localStorage.getItem('user_id');

export const fetchTypes = () => async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}?user_id=${getUserId()}`, {
        withCredentials: false
      });
      dispatch({ type: FETCH_TYPES, payload: response.data });
    } catch (error) {
      if (error.response?.status === 404) {
        dispatch({ type: FETCH_TYPES, payload: [] });
      } else {
        console.error("Ошибка загрузки типов:", error);
      }
    }
  };

export const addType = (data) => async (dispatch) => {
    const payload = { ...data, user_id: Number(getUserId()) };
    const response = await axios.post(BASE_URL, payload, {
        withCredentials: false
    });
    dispatch({ type: ADD_TYPE, payload: response.data });
};

export const updateType = (id, updatedData) => async (dispatch) => {
    try {
        console.log('Sending PATCH request for update:', updatedData); // Логирование перед запросом
        const response = await axios.put(`${BASE_URL}/${id}`, updatedData, {
            withCredentials: false
        });
        console.log('Update response:', response.data); // Логирование ответа
        dispatch({ type: UPDATE_TYPE, payload: response.data });
    } catch (error) {
        console.error('Error updating type:', error);
    }
};


export const deleteType = (id) => async (dispatch) => {
    await axios.delete(`${BASE_URL}/${id}`, {
        withCredentials: false
    });
    dispatch({ type: DELETE_TYPE, payload: id });
};

