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

export const AddNewBookmark = createAction(
    '[Bookmarks] add new bookmark',
    props<{ bookmark: IBookmark }>()
);

export const EditBookmark = createAction(
    '[Bookmarks] edit bookmark',
    props<{ bookmark: IBookmark }>()
);

