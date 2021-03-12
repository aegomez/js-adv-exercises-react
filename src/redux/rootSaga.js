import { all, fork } from 'redux-saga/effects';

import { gallerySagas } from '../42-gallery/state';

export default function* rootSaga() {
  yield all([fork(gallerySagas)]);
}
