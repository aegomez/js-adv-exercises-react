import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import 'fake-indexeddb/auto';

import { UseIndexedDB } from './Example.stories';
import * as IDB from '../api/indexedDB';

const storeName = 'records';

test('saves a key/value pair using IndexedDB', async () => {
  const key = 'testing';
  let newValue = 'You are gonna need a bigger boat.';

  render(<UseIndexedDB {...UseIndexedDB.args} storageKey={key} />);

  const input = screen.getByLabelText('New value');
  const update = screen.getByText('Update');
  let value = screen.getByTitle('value');

  let db;
  await act(async () => {
    db = await IDB.openDatabase('HooksDB', storeName);
  });

  let storedValue = await IDB.getItem(db, storeName, key);

  // stored value starts empty
  expect(value.textContent).toBe('');
  expect(storedValue).toBe(undefined);

  // submit input value
  fireEvent.change(input, { target: { value: newValue } });
  fireEvent.click(update);

  // wait for component to render the initial value
  value = await screen.findByText(newValue);
  storedValue = await IDB.getItem(db, storeName, key);

  // updated value is stored and displayed
  expect(value.textContent).toBe(newValue);
  expect(storedValue).toBe(newValue);

  // update value again
  newValue = 'Smile!';

  fireEvent.change(input, { target: { value: newValue } });
  fireEvent.click(update);

  value = await screen.findByText(newValue);
  storedValue = await IDB.getItem(db, storeName, key);

  expect(value.textContent).toBe(newValue);
  expect(storedValue).toBe(newValue);
});

test('can initialize the data on first render', async () => {
  const key = 'testing-initial';
  const initialValue = 'Very important data';

  render(
    <UseIndexedDB
      {...UseIndexedDB.args}
      storageKey={key}
      initialValue={initialValue}
    />
  );

  const input = screen.getByLabelText('New value');
  const update = screen.getByText('Update');

  let db;
  await act(async () => {
    db = await IDB.openDatabase('HooksDB', storeName);
  });

  // wait for component to render the initial value
  let value = await screen.findByText(initialValue);
  let storedValue = await IDB.getItem(db, storeName, key);

  // value is initialized locally and in the database
  expect(value.textContent).toBe(initialValue);
  expect(storedValue).toBe(initialValue);

  // the value can be updated as usual
  const updatedValue = 'Forget about the other data';

  fireEvent.change(input, { target: { value: updatedValue } });
  fireEvent.click(update);

  value = await screen.findByText(initialValue);
  storedValue = await IDB.getItem(db, storeName, key);

  expect(value.textContent).toBe(updatedValue);
  expect(storedValue).toBe(updatedValue);
});

test('does not overwrite old stored data on render', async () => {
  const key = 'testing-previous';
  const oldValue = 'I hope no one overwrites this data';
  const initialValue = 'Observe...';

  // Key has some associated data before using the hook
  let db;
  await act(async () => {
    db = await IDB.openDatabase('HooksDB', storeName);
  });
  await IDB.setItem(db, storeName, key, oldValue);

  render(
    <UseIndexedDB
      {...UseIndexedDB.args}
      storageKey={key}
      initialValue={initialValue}
    />
  );

  // the component will eventually render with oldValue
  let value = await screen.findByText(oldValue);
  const storedValue = await IDB.getItem(db, storeName, key);

  expect(value.textContent).toBe(oldValue);
  expect(value.textContent).not.toBe(initialValue);
  expect(storedValue).toBe(oldValue);
  expect(storedValue).not.toBe(initialValue);

  // initial value is never rendered
  await expect(screen.findByText(initialValue)).rejects.toThrow();
});
