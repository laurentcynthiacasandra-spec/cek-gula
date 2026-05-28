const BASE_URL = 'https://cek-gula-production.up.railway.app/api'

const getToken = () => localStorage.getItem('token')

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
})

const handleResponse = async (res) => {
  if (res.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
    throw new Error('Sesi kadaluarsa, silakan login ulang.')
  }
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Terjadi kesalahan.')
  return data
}

export const registerUser = async ({ name, email, password }) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  return handleResponse(res)
}

export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await handleResponse(res)
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.user))
  return data
}

export const logoutUser = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const isLoggedIn = () => !!getToken()

export const getCurrentUser = () => {
  const u = localStorage.getItem('user')
  return u ? JSON.parse(u) : null
}

export const getAllGula = async () => {
  const res = await fetch(`${BASE_URL}/gula`, { headers: authHeaders() })
  return handleResponse(res)
}

export const createGula = async ({ nama, kadarGula, imageFile }) => {
  const form = new FormData()
  form.append('nama', nama)
  form.append('kadarGula', kadarGula)
  if (imageFile) form.append('image', imageFile)
  const res = await fetch(`${BASE_URL}/gula`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    body: form,
  })
  return handleResponse(res)
}

export const deleteGula = async (id) => {
  const res = await fetch(`${BASE_URL}/gula/${id}`, { method: 'DELETE', headers: authHeaders() })
  return handleResponse(res)
}

export const getDashboard = async () => {
  const res = await fetch(`${BASE_URL}/gula/dashboard`, { headers: authHeaders() })
  return handleResponse(res)
}

export const getDiary = async (date) => {
  const q = date ? `?date=${date}` : ''
  const res = await fetch(`${BASE_URL}/diary${q}`, { headers: authHeaders() })
  return handleResponse(res)
}

export const addDiary = async (entry) => {
  const res = await fetch(`${BASE_URL}/diary`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(entry),
  })
  return handleResponse(res)
}

export const deleteDiary = async (id) => {
  const res = await fetch(`${BASE_URL}/diary/${id}`, { method: 'DELETE', headers: authHeaders() })
  return handleResponse(res)
}

export const searchNutrisi = async (q) => {
  const res = await fetch(`${BASE_URL}/nutrisi?q=${encodeURIComponent(q)}`, { headers: authHeaders() })
  return handleResponse(res)
}