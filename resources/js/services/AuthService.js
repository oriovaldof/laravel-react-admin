/* eslint-disable no-undef */
export const login = async (values) => {
  return axios.post('/api/login', values)
}

export const logout = async () => {
  return axios.get('/api/logout')
}
