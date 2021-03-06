
import apiService from './apiService'

const api_base = '/inquiry'

export const findAll = async (filter = '') => {

    try {

        return await apiService.get(`${api_base}/combobox?filter=${filter}`)
    } catch (error) {

        throw error
    }
}

export const check = async (id) => {

    try {

        return await apiService.put(`${api_base}/${id}`, {})
    } catch (error) {

        throw error
    }
}

export default {
    findAll,
    check
}
