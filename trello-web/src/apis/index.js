import axios from 'axios';
import { APP_ROOT } from '../utils/constant';

/**BOARDS */
export const fetchBoardDetailsAPI = async (boardId) => {
    const response = await axios.get(`${APP_ROOT}/v1/boards/${boardId}`);
    return response.data;
}
/**BOARDS */

/**COLUMNS */
export const createNewColumnAPI = async (newColumnData) => {
    const response = await axios.post(`${APP_ROOT}/v1/columns`, newColumnData);
    return response.data;
}
/**COLUMNS */


/**CARDS */
export const createNewCardAPI = async (newCardData) => {
    const response = await axios.post(`${APP_ROOT}/v1/cards`, newCardData);
    return response.data;
}
/**CARDS */




