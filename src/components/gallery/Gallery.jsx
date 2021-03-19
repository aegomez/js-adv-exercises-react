import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Image from './Image';
import Pagination from './Pagination';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '95vh',
  },
  grid: (props) => ({
    display: 'grid',
    grid: `auto-flow dense ${props.rowHeight}px / repeat(${props.cols}, 1fr)`,
    gap: '8px',
    margin: '0 0 8px',
    padding: '0',
    overflowY: 'auto',
  }),
}));

export default function Gallery({
  pageData: { images, page, total },
  rowHeight = 240,
  loading = false,
  onScrollToBottom,
  onPageChange,
}) {
  // calculate number of columns based on available width
  const [width, setWidth] = useState(0);
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);
  const cols = Math.min(Math.floor(width / rowHeight), images.length);

  const classes = useStyles({ rowHeight, cols });

  // page scrolling event listener
  const [bottomReached, setBottomReached] = useState(false);
  function handleScroll(event) {
    const el = event.target;
    const bottom = el.scrollHeight - el.scrollTop - 40 <= el.clientHeight;
    if (!bottomReached && bottom) {
      onScrollToBottom(page);
      setBottomReached(true);
    }
  }

  return (
    <div ref={measuredRef} className={classes.root}>
      <ul className={classes.grid} onScroll={handleScroll} aria-label="gallery">
        {images.map((image, idx) => (
          <Image key={idx} loading={loading} {...image} />
        ))}
      </ul>
      <Pagination
        pageCount={total}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </div>
  );
}

Gallery.propTypes = {
  pageData: PropTypes.shape({
    id: PropTypes.string,
    page: PropTypes.number,
    total: PropTypes.number,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
      })
    ),
  }),
  rowHeight: PropTypes.number,
  loading: PropTypes.bool,
  onScrollToBottom: PropTypes.func,
  onPageChange: PropTypes.func,
};
