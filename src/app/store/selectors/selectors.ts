import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IBookmarksState } from "../reducers/reducers";

const selectBookmarksState = createFeatureSelector<IBookmarksState>('bookmarksState');

export const bookmarks = createSelector(
    selectBookmarksState,
    (bookmarksState) => bookmarksState.bookmarks
);

export const error = createSelector(
    selectBookmarksState,
    (bookmarksState) => bookmarksState.error
);
