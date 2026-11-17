/**
 * API service utility
 * Provides a base Fetch wrapper configured with the backend API URL.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export const apiClient = {
  baseURL: `${API_BASE_URL}/api`,

  async get<T>(endpoint: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'include',
      ...init,
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json() as Promise<T>;
  },

  async post<T>(endpoint: string, body: unknown, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
      ...init,
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json() as Promise<T>;
  },
};

