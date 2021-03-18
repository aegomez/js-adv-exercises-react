import { all, fork } from 'redux-saga/effects';

import { gallerySagas } from './gallery/sagas';

export default function* rootSaga() {
  yield all([fork(gallerySagas)]);
}
