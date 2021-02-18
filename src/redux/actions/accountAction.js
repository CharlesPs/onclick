import { toast } from 'react-toastify'

import { handleCatchNotify } from 'helpers/api'
import { configApp } from 'helpers/config'

import api from 'services/accountApi'

const login = (username, password) => {
  return async (dispatch) => {
    try {
      const res = await api.login(username, password)

      if (res) {
        dispatch({
          type: 'ACCOUNT_LOGIN',
          payload: res
        })

        window.location.replace('/')
      }
    } catch (err) {
      if (configApp.env === 'dev') console.log('accountAction.login', err)

      toast.error(err.message)
    }
  }
}

const logout = () => {
  return async (dispatch) => {
    try {
      await api.logout()

      dispatch({
        type: 'ACCOUNT_LOGOUT'
      })

      window.location.reload()
    } catch (err) {
      if (configApp.env === 'dev') console.log('accountAction.logout', err)
    }
  }
}

const selfChangePassword = (password) => {
  return async (dispatch) => {
    try {
      const res = await api.selfChangePassword(password)

      dispatch({
        type: 'ACCOUNT_CHANGE_PASSWORD',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('awardAction.update', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const accountAction = {
  login,
  logout,
  selfChangePassword
}

export default accountAction