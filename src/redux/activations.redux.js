
import activationsApi from 'services/activationsApi'

export const ACTIVATIONS_LOAD_REQUEST = 'activations-load-request'
export const ACTIVATIONS_RELOAD_REQUEST = 'activations-reload-request'
export const ACTIVATIONS_LOAD_SUCCESS = 'activations-load-success'
export const ACTIVATIONS_LOAD_ERROR = 'activations-load-error'
export const ACTIVATIONS_CREATE_USER_REQUEST = 'activations-create-user-request'
export const ACTIVATIONS_CREATE_USER_SUCCESS = 'activations-create-user-success'
export const ACTIVATIONS_CREATE_USER_ERROR = 'activations-create-user-error'

const initialState = {
    result: [],
    load_status: '',
    create_status: '',
    reloading: false,
}

export const ActivationsReducer = (state = initialState, action) => {

    const st = Object.assign({}, state)

    if (action.type === ACTIVATIONS_LOAD_REQUEST) {

        st.load_status = 'loading'
    } else if (action.type === ACTIVATIONS_RELOAD_REQUEST) {

        st.reloading = true
    } else if (action.type === ACTIVATIONS_LOAD_SUCCESS) {

        st.load_status = 'loaded'
        st.result = action.content.result
        st.reloading = false
    } else if (action.type === ACTIVATIONS_LOAD_ERROR) {

        st.load_status = 'error'
    } else if (action.type === ACTIVATIONS_CREATE_USER_REQUEST) {

        st.create_status = 'creating'
    } else if (action.type === ACTIVATIONS_CREATE_USER_SUCCESS) {

        st.create_status = 'created'
    } else if (action.type === ACTIVATIONS_CREATE_USER_ERROR) {

        st.create_status = 'error'
    }

    return st
}

const findAll = (period, reloading = false) => {

    return async (dispatch) => {

        if (reloading) {

            dispatch({
                type: ACTIVATIONS_RELOAD_REQUEST
            })
        } else {

            dispatch({
                type: ACTIVATIONS_LOAD_REQUEST
            })
        }

        try {

            const data = await activationsApi.findAll(period)

            dispatch({
                type: ACTIVATIONS_LOAD_SUCCESS,
                content: {
                    result: data.content
                }
            })
        } catch (error) {

            dispatch({
                type: ACTIVATIONS_LOAD_ERROR
            })

            throw error
        }
    }
}

const reloadAll = (period) => {

    return async (dispatch) => {

        dispatch(findAll(period, true))
    }
}

const createUser = (user_data) => {

    return async (dispatch) => {

        dispatch({
            type: ACTIVATIONS_CREATE_USER_REQUEST
        })

        try {

            await activationsApi.createUser(user_data)

            dispatch({
                type: ACTIVATIONS_CREATE_USER_SUCCESS
            })

            dispatch(findAll())
        } catch (error) {

            dispatch({
                type: ACTIVATIONS_CREATE_USER_ERROR
            })

            throw error
        }
    }
}

const ActivationActions = {
    findAll,
    reloadAll,
    createUser,
}

export default ActivationActions
