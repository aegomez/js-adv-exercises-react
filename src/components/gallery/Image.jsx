import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    listStyle: 'none',
    margin: '0',
    overflow: 'hidden',
    '&.wider': {
      gridColumn: 'span 2',
    },
    '&.taller': {
      gridRow: 'span 2',
    },
    '& img': {
      display: 'block',
      height: '100%',
      width: '100%',
    },
  },
});

export default function Image({ src, width, height, loading }) {
  const classes = useStyles();
  const ratio = width / height;
  let className = classes.root;

  if (ratio >= 2) {
    className += ' wider';
  } else if (ratio <= 0.5) {
    className += ' taller';
  }

  return (
    <li className={className}>
      {loading ? (
        <Skeleton
          variant="rect"
          width={width || 400}
          height={height || 400}
        ></Skeleton>
      ) : (
        <img src={src} alt="" />
      )}
    </li>
  );
}

Image.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  loading: PropTypes.bool,
};
