import { createReducer, on } from "@ngrx/store";
import { IBookmark } from "../../models/IBookmark";
import { AddNewBookmark, DeleteBookmark, EditBookmark, GetBookmarks, GetBookmarksError, GetBookmarksSuccess, SearchTextChanged } from "../actions/actions";

export interface IBookmarksState {
    searchText: string;
    bookmarks: IBookmark[];
    error: string;
};

const initialState: IBookmarksState = {
    searchText: '',
    bookmarks: [],
    error: ''
};

export const bookmarksReducer = createReducer(
    initialState,
    on(GetBookmarks, (state) => ({
        ...state
    })),
    on(GetBookmarksSuccess, (state, { bookmarks }) => ({
        ...state,
        bookmarks,
        error: ''
    })),
    on(GetBookmarksError, (state, { error }) => ({
        ...state,
        bookmarks: [],
        error
    })),
    on(AddNewBookmark, (state, { bookmark }) => ({
        ...state,
        bookmarks: [...state.bookmarks, bookmark],
        searchText: ''
    })),
    on(EditBookmark, (state, { bookmark }) => ({
        ...state,
        bookmarks: [...state.bookmarks.filter((item) => item.id !== bookmark.id), bookmark],
        searchText: ''
    })),
    on(DeleteBookmark, (state, { bookmarkId }) => ({
        ...state,
        bookmarks: [...state.bookmarks.filter((bookmark) => bookmark.id !== bookmarkId)],
        searchText: ''
    })),
    on(SearchTextChanged, (state, { value }) => ({
        ...state,
        searchText: value
    }))
)
