import { Component, OnInit } from '@angular/core';
import { ListItem } from './list-item/list-item';
import { IBookmark } from '../../models/IBookmark';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { IBookmarksState } from '../../store/reducers/reducers';
import * as BookmarksSelectors from '../../store/selectors/selectors';
import { GetBookmarks } from '../../store/actions/actions';

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
  public bookmarkList$: Observable<IBookmark[]>;
  public error$: Observable<string>;

  constructor(private store: Store<IBookmarksState>) {
    this.bookmarkList$ = this.store.select(BookmarksSelectors.bookmarks);
    this.error$ = this.store.select(BookmarksSelectors.error);
  }

  public ngOnInit(): void {
    this.store.dispatch(GetBookmarks());
  }
}
