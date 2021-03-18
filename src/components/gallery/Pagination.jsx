import React, { useState } from 'react';
import MuiPagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';

export default function Pagination({ pageCount, currentPage, onPageChange }) {
  const [page, setPage] = useState(currentPage || 1);
  function handleChange(event, value) {
    if (value !== page) {
      setPage(value);
      onPageChange(value);
    }
  }

  return (
    <MuiPagination
      count={pageCount}
      page={page}
      onChange={handleChange}
      color="primary"
      size="large"
      showFirstButton
      showLastButton
    />
  );
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
};
