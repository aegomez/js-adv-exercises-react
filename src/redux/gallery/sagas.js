import { call, put, select, takeLatest } from 'redux-saga/effects';

import api from '';
import { fetchData, renderPageIfLoaded, requestPage } from './actions';

function* requestPageSaga(action) {
  try {
    const requestedPage = action.payload.page;
    const cachedPages = yield select((state) => state.gallery.cachedPages);
    const isPageCached = cachedPages.includes(requestedPage);

    if (isPageCached) {
      yield put(renderPageIfLoaded);
    }
  } catch (error) {
    yield put(fetchData.failure({ error }));
  }
}

function* fetchDataSaga(action) {
  try {
    const pageData = yield call(api.fetchData, action.payload);
    yield put(fetchData.success(pageData));
  } catch (error) {
    yield put(fetchData.failure({ error }));
  }
}

export function* gallerySagas() {
  yield takeLatest(requestPage, requestPageSaga);
  yield takeLatest(fetchData.request, fetchDataSaga);
}
