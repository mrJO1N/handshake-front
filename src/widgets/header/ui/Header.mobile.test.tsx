import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { HeaderMobile } from './Header.mobile';
import { renderWithProviders, createTestStore } from '@/app/test/renderWithProviders';
import type { IUser } from '@/entities/user';

vi.mock('@/shared/lib/hooks', () => ({
  useIsMobile: () => false,
}));

const user: IUser = { id: '1', email: 'user@example.com', username: 'alice' };

const renderHeader = (session: { user: IUser | null; accessToken: string | null }) =>
  renderWithProviders(
    <HeaderMobile />,
    { store: createTestStore({ session }) },
  );

describe('HeaderMobile', () => {
  it('shows login/register buttons and hides account info when not authenticated', () => {
    renderHeader({ user: null, accessToken: null });

    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument();
    expect(screen.queryByText('@alice')).not.toBeInTheDocument();
  });

  it('shows the username and hides auth buttons when authenticated', () => {
    renderHeader({ user, accessToken: 'token' });

    expect(screen.getByRole('button', { name: '@alice' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Войти' })).not.toBeInTheDocument();
  });
});
