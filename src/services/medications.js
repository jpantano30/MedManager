const API_URL = `${process.env.REACT_APP_API_URL}/api`

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
    try {
        const response = await fetch(`${API_URL}/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh }),
        })

        if (!response.ok) {
            throw new Error('Could not refresh token')
        }

        const data = await response.json()
        localStorage.setItem('token', data.access)
        return data.access
    } catch (error) {
        console.log('Error refreshing token:', error)
        throw error
    }
}
// this function handles refreshing the token when it expires. 1. gets refresh token from local storage. 2. makes a post request to the token refresh endpoint. 3. updates local storage with new token and returns the token

const fetchWithAuth = async (url, options = {}) => {
    let headers = getAuthHeaders()
    let response = await fetch(url, { ...options, headers })

    if (response.status === 401) {
        try {
            const newToken = await refreshToken()
            localStorage.setItem('token', newToken)
            headers = {
                ...getAuthHeaders(),
                'Authorization': `Bearer ${newToken}`,
            }
            response = await fetch(url, { ...options, headers })
        } catch (error) {
            console.error('Error refreshing token:', error)
            throw new Error('Unauthorized')
        }
    }

    return response
}

export const getMedications = async () => {
    const response = await fetchWithAuth(`${API_URL}/medications/`)
    const data = await response.json()
    return Array.isArray(data) ? data : []
}
// this function fetches medications from the api. it uses fetchWithAuth to add the authorization header to the request. it then returns the response as json data. if the response is not an array, it returns an empty array. 

export const addMedication = async (medication) => {
    const response = await fetchWithAuth(`${API_URL}/medications/`, {
        method: 'POST',
        body: JSON.stringify(medication),
    })
    return response.json()
}

export const updateMedication = async (id, medication) => {
    const response = await fetchWithAuth(`${API_URL}/medications/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(medication),
    })
    return response.json()
}

export const deleteMedication = async (id) => {
    const response = await fetchWithAuth(`${API_URL}/medications/${id}/`, {
        method: 'DELETE',
    })
    return response.text()
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
    const response = await fetchWithAuth(`${API_URL}/users/profile/`)
    return response.json()
}

export const updateUserProfile = async (profile) => {
    const response = await fetchWithAuth(`${API_URL}/users/profile/`, {
        method: 'PUT',
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
    const response = await fetchWithAuth(`${API_URL}/medication_logs/`, {
        method: 'POST',
        body: JSON.stringify(log),
    })
    return response.json()
}

export const getMedicationLogs = async () => {
    const response = await fetchWithAuth(`${API_URL}/medication_logs/`)
    const data = await response.json()
    return data
}

