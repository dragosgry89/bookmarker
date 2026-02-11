import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ListItem } from './list-item/list-item';
import { IBookmark } from '../../models/IBookmark';
import { combineLatest, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IBookmarksState } from '../../store/reducers/reducers';
import * as BookmarksSelectors from '../../store/selectors/selectors';
import { DeleteBookmark, GetBookmarks } from '../../store/actions/actions';
import { DeleteConfirmDialog } from './delete-confirm-dialog/delete-confirm-dialog';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    ListItem
  ],
  templateUrl: './list.html',
  styleUrl: './list.less',
})
export class List implements OnInit {
  public readonly dialog = inject(MatDialog);

  public searchText$: Observable<string>;
  public bookmarkList$: Observable<IBookmark[]>;
  public error$: Observable<string>;

  public bookmarks: IBookmark[] = [];

  private router = inject(Router);

  constructor(
    private store: Store<IBookmarksState>
  ) {
    this.searchText$ = this.store.select(BookmarksSelectors.searchText);
    this.bookmarkList$ = this.store.select(BookmarksSelectors.bookmarks);
    this.error$ = this.store.select(BookmarksSelectors.error);

    combineLatest(
      this.searchText$,
      this.bookmarkList$
    ).subscribe(([searchText, bookmarks]) => {
      this.bookmarks = bookmarks.filter((item) => {
        return !searchText ? true : this.fuzzySearchMatch(item, searchText)
      })
    })
  }

  public ngOnInit(): void {
    this.store.dispatch(GetBookmarks());
  }

  public editBookmark(id: string) {
    this.router.navigate(['/bookmark/' + id]);
  }

  public deleteBookmark(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmDialog);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(DeleteBookmark({ bookmarkId: id }));
      }
    })
  }

  private fuzzySearchMatch(item: IBookmark, searchText: string) {
    return item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      item.url.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
  }
}
