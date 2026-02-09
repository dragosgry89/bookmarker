import { inject, Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GetBookmarks, GetBookmarksSuccess } from "../actions/actions";
import { BookmarksService } from "../../services/bookmarks.service";
import { map, switchMap } from "rxjs";

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
                    map((bookmarks) => GetBookmarksSuccess({ bookmarks }))
                )
            )
        )
    );
}