import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';
import { useLogin } from '../../model/useLogin';
import { HttpError } from '@/shared/api';

vi.mock('@/shared/lib/hooks', () => ({
  useIsMobile: () => false,
}));

vi.mock('../../model/useLogin', () => ({
  useLogin: vi.fn(),
}));

const mockedUseLogin = vi.mocked(useLogin);

describe('LoginForm', () => {
  beforeEach(() => {
    mockedUseLogin.mockReset();
  });

  it('should show a validation error and not call the mutation for an invalid email', async () => {
    const mutateAsync = vi.fn();
    mockedUseLogin.mockReturnValue({ mutateAsync, isPending: false } as unknown as ReturnType<typeof useLogin>);
    const onSuccess = vi.fn();

    render(<LoginForm onSuccess={onSuccess} onSwitchToRegister={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'not-an-email');
    await userEvent.type(screen.getByPlaceholderText('Пароль'), 'secret1');
    await userEvent.click(screen.getByRole('button', { name: 'Войти' }));

    expect(await screen.findByText('Некорректный email')).toBeInTheDocument();
    expect(mutateAsync).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('should call the mutation with the entered values on valid submit', async () => {
    const mutateAsync = vi.fn().mockResolvedValue(undefined);
    mockedUseLogin.mockReturnValue({ mutateAsync, isPending: false } as unknown as ReturnType<typeof useLogin>);
    const onSuccess = vi.fn();

    render(<LoginForm onSuccess={onSuccess} onSwitchToRegister={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('Пароль'), 'secret1');
    await userEvent.click(screen.getByRole('button', { name: 'Войти' }));

    await waitFor(() =>
      expect(mutateAsync).toHaveBeenCalledWith({ email: 'user@example.com', password: 'secret1' }),
    );
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce());
  });

  it('should show a credentials error message when the mutation rejects with a 400 HttpError', async () => {
    const mutateAsync = vi.fn().mockRejectedValue(new HttpError(400, 'Bad credentials'));
    mockedUseLogin.mockReturnValue({ mutateAsync, isPending: false } as unknown as ReturnType<typeof useLogin>);
    const onSuccess = vi.fn();

    render(<LoginForm onSuccess={onSuccess} onSwitchToRegister={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('Пароль'), 'secret1');
    await userEvent.click(screen.getByRole('button', { name: 'Войти' }));

    expect(await screen.findByText('Неверный email или пароль')).toBeInTheDocument();
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('should show a generic error message when the mutation rejects with a non-HttpError', async () => {
    const mutateAsync = vi.fn().mockRejectedValue(new Error('Network down'));
    mockedUseLogin.mockReturnValue({ mutateAsync, isPending: false } as unknown as ReturnType<typeof useLogin>);

    render(<LoginForm onSuccess={vi.fn()} onSwitchToRegister={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('Пароль'), 'secret1');
    await userEvent.click(screen.getByRole('button', { name: 'Войти' }));

    expect(await screen.findByText('Не удалось войти. Попробуйте ещё раз')).toBeInTheDocument();
  });
});
