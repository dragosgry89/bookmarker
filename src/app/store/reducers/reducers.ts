import { createReducer, on } from "@ngrx/store";
import { IBookmark } from "../../models/IBookmark";
import { GetBookmarks, GetBookmarksSuccess } from "../actions/actions";

export interface IBookmarksState {
    bookmarks: IBookmark[];
};

const initialState: IBookmarksState = {
    bookmarks: []
};

export const bookmarksReducer = createReducer(
    initialState,
    on(GetBookmarks, (state) => ({
        ...state
    })),
    on(GetBookmarksSuccess, (state, { bookmarks }) => ({
        ...state,
        bookmarks
    }))
)
