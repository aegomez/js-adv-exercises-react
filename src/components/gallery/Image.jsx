import React from 'react';
import PropTypes from 'prop-types';
import { GridListTile } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export default function Image({ src, cols, rows, ...props }) {
  return (
    <GridListTile cols={cols} rows={rows} {...props}>
      {src ? (
        <img src={src} alt="" />
      ) : (
        <Skeleton
          variant="rect"
          width={(cols || 1) * 400}
          height={(rows || 1) * 400}
        ></Skeleton>
      )}
    </GridListTile>
  );
}

Image.muiName = 'GridListTile';

Image.propTypes = {
  src: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,
};
