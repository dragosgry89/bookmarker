import { IBookmark } from "../../models/IBookmark";
import { createAction, props } from '@ngrx/store';

export const GetBookmarks = createAction(
    '[Bookmarks] get boomarks'
);

export const GetBookmarksSuccess = createAction(
    '[Bookmarks] get bookmarks success',
    props<{bookmarks: IBookmark[]}>()
);

export const GetBookmarksError = createAction(
    '[Bookmarks] get bookmarks error',
    props<{error: string}>()
);
