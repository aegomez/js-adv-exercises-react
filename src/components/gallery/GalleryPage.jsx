import React, { useCallback, useEffect, useState } from 'react';
import { GridList } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Image from './Image';
import Pagination from './Pagination';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  },
}));

export default function GalleryPage({
  pageData: { images, page, total },
  imageHeight = 240,
  loading = false,
  onScrollToBottom,
  onPageChange,
}) {
  const classes = useStyles();

  // calculate number of columns based on available width
  const [width, setWidth] = useState(0);
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);
  const cols = Math.min(Math.floor(width / imageHeight), images.length);

  // page scrolling event listener
  const [bottomReached, setBottomReached] = useState(false);
  useEffect(() => {
    function onScroll() {
      if (
        !bottomReached &&
        window.innerHeight + window.scrollY + 50 >= document.body.offsetHeight
      ) {
        onScrollToBottom();
        setBottomReached(true);
      }
    }
    window.addEventListener('scroll', onScroll);
    return function () {
      window.removeEventListener('scroll', onScroll);
    };
  }, [bottomReached, onScrollToBottom]);

  return (
    <div ref={measuredRef} className={classes.root}>
      <GridList cellHeight={imageHeight} cols={cols}>
        {images.map((image, idx) => {
          const props = {
            src: loading ? null : image.src,
            cols: 1,
            rows: 1,
          };
          if (image.width / image.height > 2) {
            props.cols = 2;
          } else if (image.height / image.width > 2) {
            props.rows = 2;
          }
          return <Image key={idx} {...props} />;
        })}
      </GridList>

      <Pagination
        pageCount={total}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </div>
  );
}

GalleryPage.propTypes = {
  pageData: PropTypes.shape({
    id: PropTypes.string,
    page: PropTypes.number,
    total: PropTypes.number,
    images: PropTypes.shape({
      src: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  }),
  imageHeight: PropTypes.number,
  loading: PropTypes.bool,
  onScrollToBottom: PropTypes.func,
  onPageChange: PropTypes.func,
};
