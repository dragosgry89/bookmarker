import { inject, Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddNewBookmark, DeleteBookmark, EditBookmark, GetBookmarks, GetBookmarksError, GetBookmarksSuccess } from "../actions/actions";
import { BookmarksService } from "../../services/bookmarks-service/bookmarks.service";
import { catchError, map, of, switchMap } from "rxjs";
import { MOCK_TEXT } from "../../mockData/texts";

@Injectable()
export class BookmarksEffects {
    private bookmarksService = inject(BookmarksService);
    private actions$ = inject(Actions);

    constructor() {}

    getBookmarks$ = createEffect(() => 
        this.actions$.pipe(
            ofType(GetBookmarks),
            switchMap(() => 
                this.bookmarksService.getBookmarks().pipe(
                    map((bookmarks) => GetBookmarksSuccess({ bookmarks })),
                    catchError(() => of(GetBookmarksError({ error: MOCK_TEXT.GET_BOOKMARKS_ERROR })))
                )
            )
        )
    );

    addNewBookMark$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AddNewBookmark),
            switchMap((action) =>
                this.bookmarksService.createBookmark(action.bookmark).pipe(
                    catchError((error) => of(GetBookmarksError({ error })))
                )
            )
        )
    );

    editBookMark$ = createEffect(() => 
        this.actions$.pipe(
            ofType(EditBookmark),
            switchMap((action) => 
                this.bookmarksService.editBookmark(action.bookmark).pipe(
                    catchError((error) => of(GetBookmarksError({ error })))
                )
            )
        )
    );

    deleteBookmark$ = createEffect(() => 
        this.actions$.pipe(
            ofType(DeleteBookmark),
            switchMap((action) =>
                this.bookmarksService.deleteBookmark(action.bookmarkId).pipe(
                    catchError((error) => of(GetBookmarksError({ error })))
                )
            )
        )
    )
}
