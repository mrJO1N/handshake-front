import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { ServicesProvider, useServicesContext } from './ServicesProvider';
import { createMockServices } from '@/app/test/renderWithProviders';

describe('useServicesContext', () => {
  it('should throw when used outside of a ServicesProvider', () => {
    expect(() => renderHook(() => useServicesContext())).toThrow('ServicesProvider missing');
  });

  it('should expose the services passed to ServicesProvider', () => {
    const services = createMockServices();

    const { result } = renderHook(() => useServicesContext(), {
      wrapper: ({ children }) => <ServicesProvider services={services}>{children}</ServicesProvider>,
    });

    expect(result.current).toBe(services);
  });
});
