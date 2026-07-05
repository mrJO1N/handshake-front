import { describe, it, expect, beforeEach } from 'vitest';
import { themeReducer, setTheme, toggleTheme } from './themeSlice';

describe('themeSlice', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to light when nothing is stored', () => {
    const state = themeReducer(undefined, { type: '@@INIT' });
    expect(state.value).toBe('light');
  });

  it('sets the theme on setTheme', () => {
    const state = themeReducer(undefined, setTheme('dark'));
    expect(state.value).toBe('dark');
  });

  it('flips the theme on toggleTheme', () => {
    const dark = themeReducer(undefined, toggleTheme());
    expect(dark.value).toBe('dark');

    const light = themeReducer(dark, toggleTheme());
    expect(light.value).toBe('light');
  });
});
