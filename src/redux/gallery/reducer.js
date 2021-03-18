import { actions } from './actions';

const initialState = {
  currentPage: 1,
  totalPages: 0,
  cachedPages: [],
  pages: {},
};

export function galleryReducer(state = initialState, action) {
  switch (action.type) {
    case actions.RENDER_PAGE_IF_LOADED: {
      return {
        ...state,
        currentPage: action.payload.page,
      };
    }
    case actions.FETCH_DATA.SUCCESS: {
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
