
import apiService from 'services/apiService'

const login = async (username, password) => {

  try {

    const data = await apiService.post('/login_check', { username, password })

    localStorage.setItem('session', JSON.stringify({
      name: data.name,
      profileId: data.profileId,
      token: data.token,
      tutorial: true,
    }))

    return data
  } catch (error) {

    //
  }
}

const logout = () => {

  localStorage.removeItem('session')
}

const selfChangePassword = async (password) => {

  try {

    const data = await apiService.put('/user/self-change-password', { password })

    return data
  } catch (err) {
  }
}

const getPermissions = async () => {

  try {

    const data = await apiService.get('/account')

    return data
  } catch (error) {

  }
}

export default {
  login,
  logout,
  selfChangePassword,
  getPermissions,
}
