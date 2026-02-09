import { inject, Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GetBookmarks, GetBookmarksError, GetBookmarksSuccess } from "../actions/actions";
import { BookmarksService } from "../../services/bookmarks.service";
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
}
