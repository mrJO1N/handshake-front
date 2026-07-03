import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('должен отрендериться с текстом', () => {
    render(<Button>Клик</Button>);
    expect(screen.getByText('Клик')).toBeInTheDocument();
  });

  it('должен вызвать callback при клике', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Клик</Button>);
    
    await userEvent.click(screen.getByText('Клик'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('должен быть отключен при disabled', () => {
    render(<Button disabled>Клик</Button>);
    expect(screen.getByText('Клик')).toBeDisabled();
  });
});
