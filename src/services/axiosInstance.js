import axios from 'axios';

// '/api' goes through the Vite proxy in dev. In production set VITE_API_URL.
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Success: return only the data. Failure: throw an Error whose message is
// the backend's { message }, so the UI can show err.message directly.
axiosInstance.interceptors.response.use(
  (res) => res.data,
  (error) => {
    let message = 'Something went wrong. Please try again.';
    if (error.response) message = error.response.data?.message || `Request failed (${error.response.status})`;
    else if (error.code === 'ECONNABORTED') message = 'The server took too long to respond.';
    else if (error.request) message = 'Cannot reach the server. Check your connection.';

    const err = new Error(message);
    err.status = error.response?.status ?? 0;
    return Promise.reject(err);
  }
);

export default axiosInstance;
