
import apiService from './apiService'

const api_base = '/inquiry'

export const findAll = async () => {

    try {

        return await apiService.get(`${api_base}/combobox`)
    } catch (error) {

        throw error
    }
}

export default {
    findAll,
}
