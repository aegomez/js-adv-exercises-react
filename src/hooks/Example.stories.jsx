import React from 'react';

import Example from './Example';
import useIndexedDB from './useIndexedDB';
import useLocalStorage from './useLocalStorage';
import useSessionStorage from './useSessionStorage';

export default {
  component: Example,
  title: 'Hooks/Example',
};

const Template = (args) => <Example {...args} />;

export const Default = Template.bind({});

export const UseLocalStorage = Template.bind({});
UseLocalStorage.args = {
  subtitle: 'useLocalStorage',
  storageHook: useLocalStorage,
};

export const UseSessionStorage = Template.bind({});
UseSessionStorage.args = {
  subtitle: 'useSessionStorage',
  storageHook: useSessionStorage,
};

export const UseIndexedDB = Template.bind({});
UseIndexedDB.args = {
  subtitle: 'useIndexedDB',
  storageHook: useIndexedDB,
};
