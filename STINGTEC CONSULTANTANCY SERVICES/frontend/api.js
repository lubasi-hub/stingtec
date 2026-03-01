// STINGTEC API Client
// Connects frontend to backend API

const API_BASE_URL = 'http://localhost:5000/api';

// Store token
let authToken = localStorage.getItem('authToken') || null;

// API Helper Functions
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };
    
    // Add auth token if available
    if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    try {
        console.log('Making API request to:', url, 'with headers:', config.headers);
        const response = await fetch(url, config);
        console.log('Response status:', response.status);
        
        // Handle 422 specifically to see the error
        if (response.status === 422) {
            const errorText = await response.text();
            console.error('422 Error details:', errorText);
            throw new Error(`Server error: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'API request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// ==================== AUTH API ====================

async function registerUser(email, password) {
    const data = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
    return data;
}

async function loginUser(email, password) {
    const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
    
    // Store token
    if (data.access_token) {
        console.log('Storing auth token:', data.access_token);
        console.log('Storing user data:', data.user);
        authToken = data.access_token;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('Token stored in localStorage:', localStorage.getItem('authToken'));
    }
    
    return data;
}

function logoutUser() {
    authToken = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
}

function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    console.log('Current user from localStorage:', userStr);
    return userStr ? JSON.parse(userStr) : null;
}

function isLoggedIn() {
    console.log('Checking if logged in. Auth token exists:', !!authToken);
    return !!authToken;
}

function isAdmin() {
    const user = getCurrentUser();
    return user && user.is_admin;
}

// ==================== USERS API ====================

async function getUsers() {
    const data = await apiRequest('/users');
    return data.users;
}

// ==================== SERVICES API ====================

async function getServices() {
    const data = await apiRequest('/services');
    return data.services;
}

async function createService(serviceData) {
    const data = await apiRequest('/services', {
        method: 'POST',
        body: JSON.stringify(serviceData)
    });
    return data;
}

async function updateService(serviceId, serviceData) {
    const data = await apiRequest(`/services/${serviceId}`, {
        method: 'PUT',
        body: JSON.stringify(serviceData)
    });
    return data;
}

async function deleteService(serviceId) {
    const data = await apiRequest(`/services/${serviceId}`, {
        method: 'DELETE'
    });
    return data;
}

// ==================== BLOGS API ====================

async function getBlogs() {
    const data = await apiRequest('/blogs');
    return data.blogs;
}

async function createBlog(blogData) {
    const data = await apiRequest('/blogs', {
        method: 'POST',
        body: JSON.stringify(blogData)
    });
    return data;
}

async function updateBlog(blogId, blogData) {
    const data = await apiRequest(`/blogs/${blogId}`, {
        method: 'PUT',
        body: JSON.stringify(blogData)
    });
    return data;
}

async function deleteBlog(blogId) {
    const data = await apiRequest(`/blogs/${blogId}`, {
        method: 'DELETE'
    });
    return data;
}

// ==================== CONTACT API ====================

async function sendContactMessage(contactData) {
    const data = await apiRequest('/contact', {
        method: 'POST',
        body: JSON.stringify(contactData)
    });
    return data;
}

// ==================== SERVICE BOOKINGS API ====================

async function createBooking(bookingData) {
    const data = await apiRequest('/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData)
    });
    return data;
}

async function getBookings() {
    const data = await apiRequest('/bookings', {
        method: 'GET'
    });
    return data;
}

async function getBooking(bookingId) {
    const data = await apiRequest(`/bookings/${bookingId}`, {
        method: 'GET'
    });
    return data;
}

async function updateBookingStatus(bookingId, status) {
    const data = await apiRequest(`/bookings/${bookingId}`, {
        method: 'PUT',
        body: JSON.stringify({ status })
    });
    return data;
}

async function deleteBooking(bookingId) {
    const data = await apiRequest(`/bookings/${bookingId}`, {
        method: 'DELETE'
    });
    return data;
}

// Export functions for use in app.js
window.API = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    isLoggedIn,
    isAdmin,
    getUsers,
    getServices,
    createService,
    updateService,
    deleteService,
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    sendContactMessage,
    createBooking,
    getBookings,
    getBooking,
    updateBookingStatus,
    deleteBooking
};
