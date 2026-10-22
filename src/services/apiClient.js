import axios from 'axios'
// Future API adapter only. Demo screens currently use DemoDataContext/localStorage.
// Set VITE_API_BASE_URL when a production backend is implemented.
export const apiClient=axios.create({baseURL:import.meta.env.VITE_API_BASE_URL||'/api',timeout:15000,headers:{'Content-Type':'application/json'}})
// Never store long-lived user auth tokens in localStorage; use a secure HttpOnly session cookie.
