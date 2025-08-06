import axios from 'axios';
import { APP_ROOT } from '../utils/constant';
export const fetchBoardDetailsAPI = async (boardId) => {
    const response = await axios.get(`${APP_ROOT}/v1/boards/${boardId}`);
    return response.data;
}