import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { HeaderDesktop } from './Header.desktop';
import { renderWithProviders, createTestStore } from '@/app/test/renderWithProviders';
import type { IUser } from '@/entities/user';

vi.mock('@/shared/lib/hooks', () => ({
  useIsMobile: () => false,
}));

const user: IUser = { id: '1', email: 'user@example.com', username: 'alice' };

const renderHeader = (session: { user: IUser | null; accessToken: string | null }) =>
  renderWithProviders(
    <HeaderDesktop />,
    { store: createTestStore({ session }) },
  );

describe('HeaderDesktop', () => {
  it('shows login/register buttons and hides account info when not authenticated', () => {
    renderHeader({ user: null, accessToken: null });

    expect(screen.getByRole('button', { name: 'Вход' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Регистрация' })).toBeInTheDocument();
    expect(screen.queryByText('@alice')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'выйти' })).not.toBeInTheDocument();
  });

  it('shows the username and logout button and hides auth buttons when authenticated', () => {
    renderHeader({ user, accessToken: 'token' });

    expect(screen.getByText('@alice')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'выйти' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Вход' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Регистрация' })).not.toBeInTheDocument();
  });
});
