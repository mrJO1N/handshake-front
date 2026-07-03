import { API_URL } from '@/shared/config/env';
import { HttpError, type HttpClient, type RequestOptions } from './types';

let getAccessToken: () => string | null = () => null;

export const setAccessTokenProvider = (fn: () => string | null) => {
  getAccessToken = fn;
};

const request = async <T>(
  method: string,
  url: string,
  body?: unknown,
  options?: RequestOptions,
): Promise<T> => {
  const token = getAccessToken();
  const response = await fetch(`${API_URL}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal: options?.signal,
  });

  const text = await response.text();

  let data
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new HttpError(response.status, "not a json", data);
  }

  if (!response.ok) {
    const message =
      (data && typeof data === 'object' && 'message' in data
        ? String(data.message)
        : response.statusText) || 'Request failed';
    throw new HttpError(response.status, message, data);
  }

  return data as T;
};

export const httpClient: HttpClient = {
  get: (url, options) => request('GET', url, undefined, options),
  post: (url, body, options) => request('POST', url, body, options),
  patch: (url, body, options) => request('PATCH', url, body, options),
  delete: (url, options) => request('DELETE', url, undefined, options),
};