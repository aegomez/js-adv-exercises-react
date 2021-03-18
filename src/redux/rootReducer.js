import { combineReducers } from 'redux';

import { galleryReducer } from './gallery/reducer';

export default combineReducers({
  gallery: galleryReducer,
});
