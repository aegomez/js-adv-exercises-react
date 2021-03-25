import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { UseLocalStorage } from './Example.stories';

test('saves data using local storage', () => {
  const key = 'testing';
  let newValue = 'This is the way';

  render(<UseLocalStorage {...UseLocalStorage.args} storageKey={key} />);

  const input = screen.getByLabelText('New value');
  const update = screen.getByText('Update');
  const value = screen.getByTitle('value');

  // stored value starts empty
  expect(value.textContent).toBe('');
  expect(window.localStorage.getItem(key)).toBe(null);

  // submit input value
  fireEvent.change(input, { target: { value: newValue } });
  expect(input.value).toBe(newValue);
  fireEvent.click(update);

  // value is stored and displayed
  expect(input.value).toBe('');
  expect(value.textContent).toBe(newValue);
  expect(window.localStorage.getItem(key)).toBe(newValue);

  // update value again
  newValue = 'Hello there';

  fireEvent.change(input, { target: { value: newValue } });
  fireEvent.click(update);

  expect(value.textContent).toBe(newValue);
  expect(window.localStorage.getItem(key)).toBe(newValue);
});

test('can initialize the storage on first render', () => {
  const key = 'testing-initial';
  const initialValue = 'Very important data';

  render(
    <UseLocalStorage
      {...UseLocalStorage.args}
      storageKey={key}
      initialValue={initialValue}
    />
  );

  const input = screen.getByLabelText('New value');
  const update = screen.getByText('Update');
  const value = screen.getByTitle('value');

  // stored value is initialized
  expect(value.textContent).toBe(initialValue);
  expect(window.localStorage.getItem(key)).toBe(initialValue);

  // the value can be updated as usual
  const updatedValue = 'Forget about the other data';

  fireEvent.change(input, { target: { value: updatedValue } });
  fireEvent.click(update);

  expect(value.textContent).toBe(updatedValue);
  expect(window.localStorage.getItem(key)).toBe(updatedValue);
});

test('does not overwrite old stored values on render', () => {
  const key = 'testing-previous';
  const oldValue = 'Last session data';
  const initialValue = 'Overwriting';

  window.localStorage.setItem(key, oldValue);
  render(
    <UseLocalStorage
      {...UseLocalStorage.args}
      storageKey={key}
      initialValue={initialValue}
    />
  );

  const value = screen.getByTitle('value');

  // initial value is ignored
  expect(value.textContent).toBe(oldValue);
  expect(value.textContent).not.toBe(initialValue);
  expect(window.localStorage.getItem(key)).toBe(oldValue);
  expect(window.localStorage.getItem(key)).not.toBe(initialValue);
});
