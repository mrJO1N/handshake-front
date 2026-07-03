import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal', () => {
  it('should render nothing when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <p>Content</p>
      </Modal>,
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render its content when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should call onClose when clicking the overlay', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Content</p>
      </Modal>,
    );

    const overlay = screen.getByRole('dialog').parentElement!;
    await userEvent.click(overlay);

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('should call onClose when clicking the close button', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Content</p>
      </Modal>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Закрыть' }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('should call onClose when pressing Escape', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Content</p>
      </Modal>,
    );

    await userEvent.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('should not call onClose when clicking inside the content', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Content</p>
      </Modal>,
    );

    await userEvent.click(screen.getByText('Content'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should stay mounted during the close animation and unmount once it completes', async () => {
    vi.useFakeTimers();
    try {
      const { rerender } = render(
        <Modal isOpen={true} onClose={vi.fn()}>
          <p>Content</p>
        </Modal>,
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      rerender(
        <Modal isOpen={false} onClose={vi.fn()}>
          <p>Content</p>
        </Modal>,
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      await act(async () => {
        await vi.advanceTimersByTimeAsync(300);
      });

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});
