import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import MuiPagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';

import { requestPage } from './state';

export default function Pagination({ pageCount, currentPage }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(currentPage || 1);
  const handleChange = (event, value) => {
    if (value !== page) {
      setPage(value);
      dispatch(requestPage(value));
    }
  };

  return (
    <>
      <MuiPagination
        count={pageCount}
        page={page}
        onChange={handleChange}
        color="primary"
      />
    </>
  );
}

Pagination.propTypes = {
  pageCount: PropTypes.number,
};
