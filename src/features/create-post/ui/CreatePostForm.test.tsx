import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreatePostForm } from './CreatePostForm';
import { useCreatePost } from '@/entities/post';
import { useSelector } from 'react-redux'; 
import { HttpError } from '@/shared/api';
import type { IUser } from '@/entities/user';

vi.mock('@/entities/post', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/entities/post')>();
  return { ...actual, useCreatePost: vi.fn() };
});

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-redux')>();
  return { ...actual, useSelector: vi.fn() };
});

const mockedUseCreatePost = vi.mocked(useCreatePost);
const mockedUseSelector = vi.mocked(useSelector);

const user: IUser = { id: '1', email: 'user@example.com', username: 'alice' };

describe('CreatePostForm', () => {
  beforeEach(() => {
    mockedUseCreatePost.mockReset();
    mockedUseSelector.mockReset();
    mockedUseSelector.mockReturnValue(user);
  });

  it('should show validation errors and not call the mutation when fields are empty', async () => {
    const mutateAsync = vi.fn();
    mockedUseCreatePost.mockReturnValue({ mutateAsync, isPending: false } as unknown as ReturnType<
      typeof useCreatePost
    >);

    render(<CreatePostForm onSuccess={vi.fn()} />);

    await userEvent.click(screen.getByRole('button', { name: 'Создать' }));

    expect(await screen.findByText('Минимум 5 символа')).toBeInTheDocument();
    expect(mutateAsync).not.toHaveBeenCalled();
  });

  it('should call the mutation with the entered field values on valid submit', async () => {
    const mutateAsync = vi.fn().mockResolvedValue(undefined);
    mockedUseCreatePost.mockReturnValue({ mutateAsync, isPending: false } as unknown as ReturnType<
      typeof useCreatePost
    >);
    const onSuccess = vi.fn();

    render(<CreatePostForm onSuccess={onSuccess} />);

    await userEvent.type(screen.getByPlaceholderText('Заголовок'), 'A valid title');
    await userEvent.type(screen.getByPlaceholderText('Что хотите получить'), 'wants something nice');
    await userEvent.type(screen.getByPlaceholderText('Что предлагаете'), 'offers something nice');
    await userEvent.click(screen.getByRole('button', { name: 'Создать' }));

    await waitFor(() =>
      expect(mutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'A valid title',
          theUserWants: 'wants something nice',
          theUserOffers: 'offers something nice',
          author: user.username,
        }),
      ),
    );
  });

  it('should show an error message when the mutation rejects with a 400 HttpError', async () => {
    const mutateAsync = vi.fn().mockRejectedValue(new HttpError(400, 'Bad request'));
    mockedUseCreatePost.mockReturnValue({ mutateAsync, isPending: false } as unknown as ReturnType<
      typeof useCreatePost
    >);

    render(<CreatePostForm onSuccess={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText('Заголовок'), 'A valid title');
    await userEvent.type(screen.getByPlaceholderText('Что хотите получить'), 'wants something nice');
    await userEvent.type(screen.getByPlaceholderText('Что предлагаете'), 'offers something nice');
    await userEvent.click(screen.getByRole('button', { name: 'Создать' }));

    expect(await screen.findByText('Проверьте введённые данные и попробуйте снова')).toBeInTheDocument();
  });

  it('should show a generic error message when the mutation rejects with a non-HttpError', async () => {
    const mutateAsync = vi.fn().mockRejectedValue(new Error('Server exploded'));
    mockedUseCreatePost.mockReturnValue({ mutateAsync, isPending: false } as unknown as ReturnType<
      typeof useCreatePost
    >);

    render(<CreatePostForm onSuccess={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText('Заголовок'), 'A valid title');
    await userEvent.type(screen.getByPlaceholderText('Что хотите получить'), 'wants something nice');
    await userEvent.type(screen.getByPlaceholderText('Что предлагаете'), 'offers something nice');
    await userEvent.click(screen.getByRole('button', { name: 'Создать' }));

    expect(await screen.findByText('Не удалось создать пост. Попробуйте ещё раз')).toBeInTheDocument();
  });

  it('should not call the mutation on submit when there is no authenticated user', async () => {
    mockedUseSelector.mockReturnValue(null);
    const mutateAsync = vi.fn().mockResolvedValue(undefined);
    mockedUseCreatePost.mockReturnValue({ mutateAsync, isPending: false } as unknown as ReturnType<
      typeof useCreatePost
    >);
    const onSuccess = vi.fn();

    render(<CreatePostForm onSuccess={onSuccess} />);

    await userEvent.type(screen.getByPlaceholderText('Заголовок'), 'A valid title');
    await userEvent.type(screen.getByPlaceholderText('Что хотите получить'), 'wants something nice');
    await userEvent.type(screen.getByPlaceholderText('Что предлагаете'), 'offers something nice');
    await userEvent.click(screen.getByRole('button', { name: 'Создать' }));

    expect(mutateAsync).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    // Without the `!user` guard, accessing `user.username` throws and is caught,
    // surfacing the generic error message instead of a silent no-op.
    expect(screen.queryByText('Не удалось создать пост. Попробуйте ещё раз')).not.toBeInTheDocument();
  });
});
