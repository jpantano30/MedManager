const API_URL = 'http://localhost:8000/api'

const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    // console.log('Token:', token)
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
}
// gets the auth token stored in local storage and returns it within an object as the authorization header for bearer token usage

const refreshToken = async () => {
    const refresh = localStorage.getItem('refreshToken')
    const response = await fetch(`${API_URL}/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh }),
    })
    const data = await response.json()
    localStorage.setItem('token', data.access)
    return data.access
}
// this function handles refreshing the token when it expires. 1. gets refresh token from local storage. 2. makes a post request to the token refresh endpoint. 3. updates local storage with new token and returns the token

export const getMedications = async () => {
    let headers = getAuthHeaders()
    // console.log('Fetching medications with headers:', headers)
    let response = await fetch(`${API_URL}/medications/`, { headers })
    
    if (response.status === 401) {
        const newToken = await refreshToken()
        headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${newToken}`,
        }
        response = await fetch(`${API_URL}/medications/`, { headers })
    }
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Network response was not ok: ${errorData.detail || 'Unknown error'}`)
  }
  
  const data = await response.json()
  return Array.isArray(data) ? data : []
}
// retrieves auth headers, makes a get request, if 401 unauthorized - token might have expired, it refreshed the toeksn and retried get request with new token. 

export const addMedication = async (medication) => {
    console.log('Adding medication:', medication)
    const response = await fetch(`${API_URL}/medications/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(medication),
    })
    if (!response.ok) {
      const errorData = await response.json()
      console.error('Error adding medication:', errorData)
      throw new Error(`Network response was not ok: ${errorData.detail || 'Unknown error'}`)
  }
    return response.json()
}

export const updateMedication = async (id, medication) => {
    const response = await fetch(`${API_URL}/medications/${id}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(medication),
    })
    return response.json()
}

export const deleteMedication = async (id) => {
    const response = await fetch(`${API_URL}/medications/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    })
    if (response.status === 204) {
      return {} // return an empty object if the response is 204 No Content
  }
  if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Network response was not ok: ${errorData.detail || 'Unknown error'}`)
  }
    return response.json()
}

export const registerUser = async (user) => {
    const response = await fetch(`${API_URL}/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    return response.json()
}

export const loginUser = async (user) => {
    const response = await fetch(`${API_URL}/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    const data = await response.json()
    localStorage.setItem('token', data.access)
    localStorage.setItem('refreshToken', data.refresh)
    return data
}

export const getUserProfile = async () => {
    const response = await fetch(`${API_URL}/users/profile/`, {
        headers: getAuthHeaders(),
    })
    return response.json()
}
