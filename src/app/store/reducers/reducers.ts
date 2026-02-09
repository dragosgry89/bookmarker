import { createReducer, on } from "@ngrx/store";
import { IBookmark } from "../../models/IBookmark";
import { AddNewBookmark, GetBookmarks, GetBookmarksError, GetBookmarksSuccess } from "../actions/actions";

export interface IBookmarksState {
    bookmarks: IBookmark[];
    error: string;
};

const initialState: IBookmarksState = {
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
        bookmarks: [...state.bookmarks, bookmark]
    }))
)
