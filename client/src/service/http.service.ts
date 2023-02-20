import axios from "axios";

const API_URL = 'http://localhost:8080/poll'

// TODO: should type Poll be added?
export const getPoll = async (id:number) => {
    return await axios.get(API_URL);
}