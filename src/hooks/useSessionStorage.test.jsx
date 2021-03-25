import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { UseSessionStorage } from './Example.stories';

test('saves data using session storage', () => {
  const key = 'testing';
  let newValue = 'This is the way';

  render(<UseSessionStorage {...UseSessionStorage.args} storageKey={key} />);

  const input = screen.getByLabelText('New value');
  const update = screen.getByText('Update');
  const value = screen.getByTitle('value');

  // stored value starts empty
  expect(value.textContent).toBe('');
  expect(window.sessionStorage.getItem(key)).toBe(null);

  // submit input value
  fireEvent.change(input, { target: { value: newValue } });
  expect(input.value).toBe(newValue);
  fireEvent.click(update);

  // value is stored and displayed
  expect(input.value).toBe('');
  expect(value.textContent).toBe(newValue);
  expect(window.sessionStorage.getItem(key)).toBe(newValue);

  // update value again
  newValue = 'Hello there';

  fireEvent.change(input, { target: { value: newValue } });
  fireEvent.click(update);

  expect(value.textContent).toBe(newValue);
  expect(window.sessionStorage.getItem(key)).toBe(newValue);
});

test('can initialize the storage on first render', () => {
  const key = 'testing-initial';
  const initialValue = 'Very important data';

  render(
    <UseSessionStorage
      {...UseSessionStorage.args}
      storageKey={key}
      initialValue={initialValue}
    />
  );

  const input = screen.getByLabelText('New value');
  const update = screen.getByText('Update');
  const value = screen.getByTitle('value');

  // stored value is initialized
  expect(value.textContent).toBe(initialValue);
  expect(window.sessionStorage.getItem(key)).toBe(initialValue);

  // the value can be updated as usual
  const updatedValue = 'Forget about the other data';

  fireEvent.change(input, { target: { value: updatedValue } });
  fireEvent.click(update);

  expect(value.textContent).toBe(updatedValue);
  expect(window.sessionStorage.getItem(key)).toBe(updatedValue);
});

test('does not overwrite old stored values on render', () => {
  const key = 'testing-previous';
  const oldValue = 'Last session data';
  const initialValue = 'Overwriting';

  window.sessionStorage.setItem(key, oldValue);
  render(
    <UseSessionStorage
      {...UseSessionStorage.args}
      storageKey={key}
      initialValue={initialValue}
    />
  );

  const value = screen.getByTitle('value');

  // initial value is ignored
  expect(value.textContent).toBe(oldValue);
  expect(value.textContent).not.toBe(initialValue);
  expect(window.sessionStorage.getItem(key)).toBe(oldValue);
  expect(window.sessionStorage.getItem(key)).not.toBe(initialValue);
});
