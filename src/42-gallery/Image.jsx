import React from 'react';
import { GridListTile } from '@material-ui/core';

export default function Image({ src, width, height }, key) {
  let cols = 1;
  let rows = 1;
  if (width / height > 2) {
    cols = 2;
  } else if (height / width > 2) {
    rows = 2;
  }

  return (
    <>
      <GridListTile cols={cols} rows={rows}>
        <img src={src} alt="" />
      </GridListTile>
    </>
  );
}
