import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PostList } from './PostList';
import type { IPostContent } from '@/entities/post';

const posts: IPostContent[] = [
  {
    id: '1',
    title: 'first post',
    theUserWants: 'wants something',
    theUserOffers: 'offers something',
    author: 'alice',
    createdAt: '2026-07-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'second post',
    theUserWants: 'wants else',
    theUserOffers: 'offers else',
    author: 'bob',
    createdAt: '2026-07-02T00:00:00.000Z',
  },
];

describe('PostList', () => {
  it('should render 5 skeletons while loading', () => {
    const { container } = render(<PostList posts={[]} isLoading />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.children).toHaveLength(5);
    expect(screen.queryByText(/FIRST POST/)).not.toBeInTheDocument();
  });

  it('should render a card per post when not loading', () => {
    const { container } = render(<PostList posts={posts} />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.children).toHaveLength(posts.length);
    expect(screen.getByText(/FIRST POST/)).toBeInTheDocument();
    expect(screen.getByText(/SECOND POST/)).toBeInTheDocument();
  });

  it('should render neither skeletons nor cards for an empty, non-loading list', () => {
    const { container } = render(<PostList posts={[]} />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.children).toHaveLength(0);
  });
});
