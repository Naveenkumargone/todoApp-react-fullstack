import axios from 'axios';

export const createTodo = async(data) => {
    const url = 'http://localhost:4100/api/todos/todo';
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllTodos = async() => {
    const url = 'http://localhost:4100/api/todos/';
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const toggleTodo = async(id) => {
    const url = `http://localhost:4100/api/todos/todo/${id}`;
    try {
        const response = await axios.put(url, id);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteTodos = async(id) => {
    const url = `http://localhost:4100/api/todos/todo/${id}`;
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}