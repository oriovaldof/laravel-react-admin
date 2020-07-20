export const all = async () => {
  return axios.get('/api/users')
}

export const destroy = async user => {
  return axios.delete(`/api/users/${user.id}`)
}

export const store = async user => {
  user.roles = [user.roles]
  return axios.post(`/api/users/`, user)
}

export const update = async user => {
  user.roles = [user.roles]
  return axios.put(`/api/users/${user.id}`, user)
}

export const updateProfile = async user => {
  return axios.put('/api/profile/', user)
}