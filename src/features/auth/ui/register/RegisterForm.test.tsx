import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegisterForm } from './RegisterForm';
import { useRegister } from '../../model/useRegister';
import { HttpError } from '@/shared/api';

vi.mock('@/shared/lib/hooks/useIsMobile', () => ({
  useIsMobile: () => false,
}));

vi.mock('../../model/useRegister', () => ({
  useRegister: vi.fn(),
}));

const mockedUseRegister = vi.mocked(useRegister);

describe('RegisterForm', () => {
  beforeEach(() => {
    mockedUseRegister.mockReset();
  });

  it('should show a mismatch error on passwordConfirm and not call the mutation when passwords differ', async () => {
    const mutateAsync = vi.fn();
    mockedUseRegister.mockReturnValue({ mutateAsync, isPending: false } as unknown as ReturnType<
      typeof useRegister
    >);

    render(<RegisterForm onSuccess={vi.fn()} onSwitchToLogin={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('Имя пользователя'), 'validuser');
    await userEvent.type(screen.getByPlaceholderText('Пароль'), 'secret1');
    await userEvent.type(screen.getByPlaceholderText('Повторите пароль'), 'different1');
    await userEvent.click(screen.getByRole('button', { name: 'Зарегистрироваться' }));

    expect(await screen.findByText('Пароли не совпадают')).toBeInTheDocument();
    expect(mutateAsync).not.toHaveBeenCalled();
  });

  it('should call the mutation with the entered values (without passwordConfirm) on valid submit', async () => {
    const mutateAsync = vi.fn().mockResolvedValue(undefined);
    mockedUseRegister.mockReturnValue({ mutateAsync, isPending: false } as unknown as ReturnType<
      typeof useRegister
    >);
    const onSuccess = vi.fn();

    render(<RegisterForm onSuccess={onSuccess} onSwitchToLogin={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('Имя пользователя'), 'validuser');
    await userEvent.type(screen.getByPlaceholderText('Пароль'), 'secret1');
    await userEvent.type(screen.getByPlaceholderText('Повторите пароль'), 'secret1');
    await userEvent.click(screen.getByRole('button', { name: 'Зарегистрироваться' }));

    await waitFor(() =>
      expect(mutateAsync).toHaveBeenCalledWith({
        email: 'user@example.com',
        username: 'validuser',
        password: 'secret1',
      }),
    );
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce());
  });

  it('should show an "email taken" error message when the mutation rejects with a 409 HttpError', async () => {
    const mutateAsync = vi.fn().mockRejectedValue(new HttpError(409, 'Email taken'));
    mockedUseRegister.mockReturnValue({ mutateAsync, isPending: false } as unknown as ReturnType<
      typeof useRegister
    >);

    render(<RegisterForm onSuccess={vi.fn()} onSwitchToLogin={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('Имя пользователя'), 'validuser');
    await userEvent.type(screen.getByPlaceholderText('Пароль'), 'secret1');
    await userEvent.type(screen.getByPlaceholderText('Повторите пароль'), 'secret1');
    await userEvent.click(screen.getByRole('button', { name: 'Зарегистрироваться' }));

    expect(await screen.findByText('Email уже занят')).toBeInTheDocument();
  });

  it('should show a generic error message when the mutation rejects with a non-HttpError', async () => {
    const mutateAsync = vi.fn().mockRejectedValue(new Error('Network down'));
    mockedUseRegister.mockReturnValue({ mutateAsync, isPending: false } as unknown as ReturnType<
      typeof useRegister
    >);

    render(<RegisterForm onSuccess={vi.fn()} onSwitchToLogin={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('Имя пользователя'), 'validuser');
    await userEvent.type(screen.getByPlaceholderText('Пароль'), 'secret1');
    await userEvent.type(screen.getByPlaceholderText('Повторите пароль'), 'secret1');
    await userEvent.click(screen.getByRole('button', { name: 'Зарегистрироваться' }));

    expect(await screen.findByText('Не удалось зарегистрироваться. Попробуйте ещё раз')).toBeInTheDocument();
  });
});
