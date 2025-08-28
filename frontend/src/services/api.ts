// CoreChat/frontend/src/services/api.ts


interface RequestOptions extends RequestInit {
    token?: string; // Optional token if it's not the default one
}

const BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || 'http://localhost:8080';


export async function apiClient<T>(
    endpoint: string,
    { method = 'GET', body, headers, token, ...customConfig }: RequestOptions = {}
): Promise<T> {
    const authToken = token || localStorage.getItem('jwtToken');

    const config: RequestInit = {
        method,
        ...customConfig,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };
    if (authToken) {
        (config.headers as Record<string, string>)['Authorization'] = `Bearer ${authToken}`;
    }
    if (body) {
        config.body = JSON.stringify(body);
    }

    let data: T;
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || response.statusText;
            const error = new Error(errorMessage) as Error & { status?: number; data?: any };
            error.status = response.status;
            error.data = errorData;
            throw error;
        }
        const text = await response.text();
        data = text ? JSON.parse(text) : ({} as T);

    } catch (err: any) {
        throw err;
    }

    return data;
}


export const GET = <T>(endpoint: string, token?: string) => apiClient<T>(endpoint, { method: 'GET', token });
export const POST = <T>(endpoint: string, body: any, token?: string) => apiClient<T>(endpoint, { method: 'POST', body, token });
export const PUT = <T>(endpoint: string, body: any, token?: string) => apiClient<T>(endpoint, { method: 'PUT', body, token });
export const DELETE = <T>(endpoint: string, token?: string) => apiClient<T>(endpoint, { method: 'DELETE', token });
export const PATCH = <T>(endpoint: string, body: any, token?: string) => apiClient<T>(endpoint, { method: 'PATCH', body, token });
