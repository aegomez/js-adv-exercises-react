import React from 'react';
import { Provider } from 'react-redux';
import { action } from '@storybook/addon-actions';

import Pagination from './Pagination';

// Redux store mock
const store = {
  getState: () => {},
  subscribe: () => 0,
  dispatch: action('dispatch'),
};

export default {
  component: Pagination,
  title: 'Gallery/Pagination',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

const Template = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  pageCount: 5,
  currentPage: 1,
};

export const MorePages = Template.bind({});
MorePages.args = {
  ...Default.args,
  pageCount: 10,
};

export const MiddlePage = Template.bind({});
MiddlePage.args = {
  ...Default.args,
  currentPage: 3,
};

export const LastPage = Template.bind({});
LastPage.args = {
  ...Default.args,
  currentPage: 5,
};
