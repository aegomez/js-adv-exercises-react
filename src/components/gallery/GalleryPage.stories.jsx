import React from 'react';

import GalleryPage from './GalleryPage';

export default {
  component: GalleryPage,
  title: 'Gallery/GalleryPage',
  argTypes: {
    onPageChange: { action: 'pageChange' },
    onScrollToBottom: { action: 'scrollToBottom' },
  },
  decorators: [(story) => <div style={{ maxWidth: '1200px' }}>{story()}</div>],
};

const testImages = [
  {
    src: '/gallery/image1.png',
    width: 500,
    height: 500,
  },
  {
    src: '/gallery/image2.png',
    width: 600,
    height: 400,
  },
  {
    src: '/gallery/image3.png',
    width: 300,
    height: 500,
  },
  {
    src: '/gallery/image4.png',
    width: 700,
    height: 300,
  },
  {
    src: '/gallery/image5.png',
    width: 400,
    height: 800,
  },
];

const Template = (args) => <GalleryPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  pageData: {
    page: 1,
    total: 5,
    images: Array.from({ length: 10 }, () => testImages[0]),
  },
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  pageData: { ...Default.args.pageData },
  loading: true,
};

export const WideImages = Template.bind({});
WideImages.args = {
  pageData: {
    page: 30,
    total: 100,
    images: [
      testImages[3],
      testImages[3],
      testImages[1],
      testImages[3],
      testImages[1],
      testImages[3],
      testImages[1],
      testImages[3],
      testImages[1],
      testImages[1],
    ],
  },
  loading: false,
};

export const TallImages = Template.bind({});
TallImages.args = {
  pageData: {
    page: 2,
    total: 2,
    images: [
      testImages[2],
      testImages[4],
      testImages[4],
      testImages[2],
      testImages[2],
      testImages[4],
      testImages[2],
      testImages[4],
      testImages[2],
      testImages[4],
    ],
  },
  loading: false,
};
