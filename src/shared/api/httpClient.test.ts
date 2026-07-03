import { describe, it, expect, vi, afterEach } from 'vitest';
import { httpClient } from './httpClient';
import { HttpError } from './types';

const mockFetchResponse = (init: { ok: boolean; status: number; statusText?: string; body: string }) =>
  vi.fn().mockResolvedValue({
    ok: init.ok,
    status: init.status,
    statusText: init.statusText ?? '',
    text: async () => init.body,
  });

describe('httpClient', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should return the parsed JSON body on a successful response', async () => {
    vi.stubGlobal('fetch', mockFetchResponse({ ok: true, status: 200, body: JSON.stringify({ id: '1' }) }));

    const result = await httpClient.get('/posts');

    expect(result).toEqual({ id: '1' });
  });

  it('should throw an HttpError with the server message when the response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetchResponse({ ok: false, status: 400, body: JSON.stringify({ message: 'Bad request' }) }),
    );

    await expect(httpClient.post('/posts', {})).rejects.toMatchObject({
      name: 'HttpError',
      status: 400,
      message: 'Bad request',
    });
  });

  it('should throw an HttpError when the response body is not valid JSON', async () => {
    vi.stubGlobal('fetch', mockFetchResponse({ ok: true, status: 200, body: 'not-json{' }));

    await expect(httpClient.get('/posts')).rejects.toBeInstanceOf(HttpError);
    await expect(httpClient.get('/posts')).rejects.toMatchObject({ message: 'not a json' });
  });
});
