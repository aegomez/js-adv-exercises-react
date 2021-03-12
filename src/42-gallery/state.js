import { call, put, select, takeLatest } from 'redux-saga/effects';

import api from './api';

// Simple redux implementation

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

// action creators

export const requestPage = (page) => ({
  type: REQUEST_PAGE,
  payload: { page },
});

export const renderPageIfLoaded = (page) => ({
  type: RENDER_PAGE_IF_LOADED,
  payload: { page },
});

export const fetchData = {
  request: (galleryID, page) => ({
    type: FETCH_DATA.REQUEST,
    payload: { galleryID, page },
  }),
  success: (pageData) => ({
    type: FETCH_DATA.SUCCESS,
    payload: { pageData },
  }),
  failure: (error) => ({
    type: FETCH_DATA.FAILURE,
    payload: { error },
  }),
};

// reducer

const initialState = {
  currentPage: 1,
  totalPages: 0,
  cachedPages: [],
  pages: {},
};

export function galleryReducer(state = initialState, action) {
  switch (action.type) {
    case RENDER_PAGE_IF_LOADED: {
      return {
        ...state,
        currentPage: action.payload.page,
      };
    }
    case FETCH_DATA.SUCCESS: {
      const { pageData } = action.payload;
      const totalPages = Math.max(state.totalPages, pageData.total);
      const cachedPages = state.cachedPages.slice().push(pageData.page);
      const pages = { ...state.pages, [pageData.page]: pageData };
      return { ...state, cachedPages, totalPages, pages };
    }
    default: {
      return state;
    }
  }
}

// sagas

function* fetchDataSaga(action) {
  try {
    const pageData = yield call(api.fetchData, action.payload);
    yield put(fetchData.success(pageData));
  } catch (error) {
    yield put(fetchData.failure({ error }));
  }
}

export function* gallerySagas() {
  yield takeLatest(fetchData.request, fetchDataSaga);
}
