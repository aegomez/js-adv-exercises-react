import React from 'react';

import Image from './Image';

export default {
  component: Image,
  title: 'Gallery/Image',
  decorators: [
    (story) => (
      <div style={{ display: 'flex', listStyle: 'none' }}>{story()}</div>
    ),
  ],
};

const Template = (args) => <Image {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: '/gallery/image1.png',
  cols: 1,
  rows: 1,
};

export const TwoColumns = Template.bind({});
TwoColumns.args = {
  src: '/gallery/image4.png',
  cols: 2,
  rows: 1,
};

export const TwoRows = Template.bind({});
TwoRows.args = {
  src: '/gallery/image5.png',
  cols: 1,
  rows: 2,
};

export const Loading = Template.bind({});
Loading.args = {
  src: null,
};
