import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Default, Mixed } from './Gallery.stories';

beforeEach(() => {
  jest
    .spyOn(HTMLUListElement.prototype, 'clientHeight', 'get')
    .mockImplementation(() => 500);
  jest
    .spyOn(HTMLUListElement.prototype, 'scrollHeight', 'get')
    .mockImplementation(() => 800);
});

afterAll(() => {
  jest.restoreAllMocks();
});

test('requests next page after scrolling to bottom', () => {
  const fetchData = jest.fn();
  render(<Default {...Default.args} onScrollToBottom={fetchData} />);

  const elem = screen.getByRole('list', { name: 'gallery' });

  expect(elem.scrollTop).toBe(0);
  expect(fetchData).not.toHaveBeenCalled();

  fireEvent.scroll(elem, { target: { scrollTop: 300 } });

  expect(elem.scrollTop).toBe(300);
  expect(fetchData).toHaveBeenCalledTimes(1);
});

test('displays next page after clicking a number button', () => {
  const num = 3;
  const displayPage = jest.fn();
  render(<Default {...Default.args} onPageChange={displayPage} />);

  expect(displayPage).not.toHaveBeenCalled();

  fireEvent.click(screen.getByRole('button', { name: `Go to page ${num}` }));

  expect(displayPage).toHaveBeenCalledTimes(1);
  expect(displayPage).toHaveBeenCalledWith(num);
});

test('displays next page after clicking next button', () => {
  const currentPage = 4;
  const displayPage = jest.fn();
  const args = {
    pageData: {
      ...Default.args.pageData,
      page: currentPage,
    },
  };
  render(<Default {...args} onPageChange={displayPage} />);

  expect(displayPage).not.toHaveBeenCalled();

  fireEvent.click(screen.getByRole('button', { name: 'Go to next page' }));

  expect(displayPage).toHaveBeenCalledTimes(1);
  expect(displayPage).toHaveBeenCalledWith(currentPage + 1);
});

test('renders a propotional image', () => {
  const { container } = render(<Mixed {...Mixed.args} />);
  const image = container.querySelector('img[src*="image1"]');
  const classes = image.parentElement.classList;

  expect(classes.contains('wider')).toBe(false);
  expect(classes.contains('taller')).toBe(false);
});

test('renders a two-column image', () => {
  const { container } = render(<Mixed {...Mixed.args} />);
  const image = container.querySelector('img[src*="image4"]');
  const classes = image.parentElement.classList;

  expect(classes.contains('wider')).toBe(true);
  expect(classes.contains('taller')).toBe(false);
});

test('renders a two-row image', () => {
  const { container } = render(<Mixed {...Mixed.args} />);
  const image = container.querySelector('img[src*="image5"]');
  const classes = image.parentElement.classList;

  expect(classes.contains('wider')).toBe(false);
  expect(classes.contains('taller')).toBe(true);
});
