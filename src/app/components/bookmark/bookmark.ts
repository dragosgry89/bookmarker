import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IBookmark } from '../../models/IBookmark';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { Observable, of } from 'rxjs';
import { MOCK_TEXT } from '../../mockData/texts';
import { BookmarksService } from '../../services/bookmarks.service';
import { IBookmarksState } from '../../store/reducers/reducers';
import { Store } from '@ngrx/store';
import { AddNewBookmark } from '../../store/actions/actions';

@Component({
  selector: 'app-bookmark',
  imports: [
    FormsModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
  ],
  templateUrl: './bookmark.html',
  styleUrl: './bookmark.less',
})
export class Bookmark implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public pathId = '';
  public headerText = '';
  public bookmark$: Observable<IBookmark> = of(<IBookmark>{});

  public bookmarkName: string = '';
  public bookmarkURL: string = '';


  constructor(private store: Store<IBookmarksState>) {}

  public ngOnInit(): void {
    this.pathId = this.activatedRoute.snapshot.paramMap.get('id') + '';

    if (!this.pathId) {
      this.bookmark$ = of(this.newBookmark());
      this.headerText = MOCK_TEXT.ADD_NEW_BOOKMARK;
    } else {
      this.headerText = MOCK_TEXT.EDIT_BOOKMARK;
      // TODO: get bookmark item
    }
  }

  public saveBookmark() {
    // TODO: also add in "created" field as timestamp
    // Used later for filtering
    const bookmark: IBookmark = <IBookmark>{
      name: this.bookmarkName,
      url: this.bookmarkURL
    };

    this.store.dispatch(AddNewBookmark({ bookmark }));

    // go back 
    this.router.navigate(['']);
  }

  public get isValid() {
    if (!this.bookmarkName || !this.bookmarkURL) {
      return false;
    }

    return true;
  }

  private newBookmark(): IBookmark {
    return <IBookmark>{
      name: '',
      url: ''
    };
  }
}
