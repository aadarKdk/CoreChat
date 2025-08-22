// CoreChat/frontend/src/services/api.ts

// This utility provides a centralized way to make authenticated API requests.
// It automatically attaches the JWT token from localStorage to each request.

interface RequestOptions extends RequestInit {
  token?: string; // Optional token if it's not the default one
}

// Define your backend URL from environment variables
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

// A generic API client function to handle fetch requests
export async function apiClient<T>(
  endpoint: string,
  { method = 'GET', body, headers, token, ...customConfig }: RequestOptions = {}
): Promise<T> {
  // Get token from argument or localStorage
  const authToken = token || localStorage.getItem('jwtToken');

  const config: RequestInit = {
    method,
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  // Attach authorization header if token exists
  if (authToken) {
    (config.headers as Record<string, string>)['Authorization'] = `Bearer ${authToken}`;
  }

  // Attach body for POST/PUT/PATCH requests
  if (body) {
    config.body = JSON.stringify(body);
  }

  let data: T;
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || response.statusText;
      const error = new Error(errorMessage) as Error & { status?: number; data?: any };
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    // Attempt to parse JSON response. Some successful responses might have no body (e.g., 204 No Content).
    const text = await response.text();
    data = text ? JSON.parse(text) : ({} as T); // Return empty object for no content

  } catch (err: any) {
    // Re-throw the error to be caught by the calling service/component
    throw err;
  }

  return data;
}

// Helper functions for common HTTP methods
export const get = <T>(endpoint: string, token?: string) => apiClient<T>(endpoint, { method: 'GET', token });
export const post = <T>(endpoint: string, body: any, token?: string) => apiClient<T>(endpoint, { method: 'POST', body, token });
export const put = <T>(endpoint: string, body: any, token?: string) => apiClient<T>(endpoint, { method: 'PUT', body, token });
export const del = <T>(endpoint: string, token?: string) => apiClient<T>(endpoint, { method: 'DELETE', token });
export const patch = <T>(endpoint: string, body: any, token?: string) => apiClient<T>(endpoint, { method: 'PATCH', body, token });
