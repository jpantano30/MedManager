const API_URL = 'http://localhost:8000/api'


const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
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
    let response = await fetch(`${API_URL}/medications/`, { headers })
    
    if (response.status === 401) {
        const newToken = await refreshToken()
        headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${newToken}`,
        }
        response = await fetch(`${API_URL}/medications/`, { headers })
    }
    const data = await response.json()
    return Array.isArray(data) ? data : []
}
// retrieves auth headers, makes a get request, if 401 unauthorized - token might have expired, it refreshed the toeksn and retried get request with new token. 

export const addMedication = async (medication) => {
    const response = await fetch(`${API_URL}/medications/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(medication),
    })
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
    try {
        const response = await fetch(`${API_URL}/medications/${id}/`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        })
        if (response.status === 204) {
            return response.text()
            // response.text prevents the console from logging 'Fetch failed loading: DELETE' when it does in fact perform the delete request. 
            // the previous shown below logs fetch failed because it doesnt return a response with content. 
            // return {} // Return an empty object if the response is 204 No Content
        }
        return response.json()
    } catch (error) {
        console.error('Error deleting medication:', error)
        throw error
    }
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

export const updateUserProfile = async (profile) => {
    const response = await fetch(`${API_URL}/users/profile/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profile),
    })
    if (!response.ok) {
        const error = await response.json()
        console.log('Error:', error)
        
        if (error.username && error.username[0] === 'A user with that username already exists.') {
            throw new Error('A user with that username already exists.')
        } else {
            throw new Error('Failed to update profile')
        }
    }
    return response.json()
}

export const logMedication = async (log) => {
    const response = await fetch(`${API_URL}/medication_logs/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(log),
    })
    return response.json()
}

export const getMedicationLogs = async () => {
    const response = await fetch(`${API_URL}/medication_logs/`, {
        headers: getAuthHeaders(),
    })
    const data = await response.json()
    return data
}