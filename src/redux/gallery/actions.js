// action types

// the user clicks on paginator
const REQUEST_PAGE = 'gallery/requestPage';
// if the page is already fetched, render it
const RENDER_PAGE_IF_LOADED = 'gallery/renderPageIfLoaded';
// fetch a page data
const FETCH_DATA = {
  REQUEST: 'gallery/fetchData/request',
  SUCCESS: 'gallery/fetchData/success',
  FAILURE: 'gallery/fetchData/failure',
};

export const actions = {
  REQUEST_PAGE,
  RENDER_PAGE_IF_LOADED,
  FETCH_DATA,
};

// action creators

export function requestPage(page) {
  return {
    type: REQUEST_PAGE,
    payload: { page },
  };
}

export function renderPageIfLoaded(page) {
  return {
    type: RENDER_PAGE_IF_LOADED,
    payload: { page },
  };
}

export const fetchData = {
  request(galleryID, page) {
    return {
      type: FETCH_DATA.REQUEST,
      payload: { galleryID, page },
    };
  },
  success(pageData) {
    return {
      type: FETCH_DATA.SUCCESS,
      payload: { pageData },
    };
  },
  failure(error) {
    return {
      type: FETCH_DATA.FAILURE,
      payload: { error },
    };
  },
};
