import React from 'react';

import Image from './Image';

export default {
  component: Image,
  title: 'Gallery/Image',
  decorators: [(story) => <div style={{ display: 'flex' }}>{story()}</div>],
};

const Template = (args) => <Image {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: '/gallery/image1.png',
  width: 500,
  height: 500,
};

export const TwoRows = Template.bind({});
TwoRows.args = {
  src: '/gallery/image4.png',
  width: 700,
  height: 300,
};

export const TwoColumns = Template.bind({});
TwoColumns.args = {
  src: '/gallery/image5.png',
  width: 400,
  height: 800,
};
