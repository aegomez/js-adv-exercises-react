import React from 'react';

import Pagination from './Pagination';

export default {
  component: Pagination,
  title: 'Gallery/Pagination',
  argTypes: { onPageChange: { action: 'pageChange' } },
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
