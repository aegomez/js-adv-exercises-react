import { combineReducers } from 'redux';

import { galleryReducer } from '../42-gallery/state';

export default combineReducers({
  gallery: galleryReducer,
});
