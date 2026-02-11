import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IBookmark } from '../../models/IBookmark';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { Observable, of, Subscription, switchMap } from 'rxjs';
import { MOCK_TEXT } from '../../mockData/texts';
import { IBookmarksState } from '../../store/reducers/reducers';
import { Store } from '@ngrx/store';
import { AddNewBookmark, EditBookmark } from '../../store/actions/actions';
import * as BookmarksSelectors from '../../store/selectors/selectors';

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
export class Bookmark implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public pathId = '';
  public headerText = '';
  public bookmark$: Observable<IBookmark> = of(<IBookmark>{});
  public subscription: Subscription = new Subscription();

  public bookmarkName: string = '';
  public bookmarkURL: string = '';

  private isEdit: boolean = false;


  constructor(private store: Store<IBookmarksState>) {}

  public ngOnInit(): void {
    // Grab path "id" parameter value
    this.pathId = this.activatedRoute.snapshot.paramMap.get('id') + '';

    // set text for either adding or editing a bookmark
    if (!this.pathId) {
      this.headerText = MOCK_TEXT.ADD_NEW_BOOKMARK;
    } else {
      this.headerText = MOCK_TEXT.EDIT_BOOKMARK;
    }

    // select existing bookmark from state
    // if no bookmark is found, generate new one (i.e. when adding new bookmark)
    this.bookmark$ = this.store.select(BookmarksSelectors.bookmarks).pipe(
      switchMap((bookmarks: IBookmark[]) => {
        const result = bookmarks.find((item) => item.id === this.pathId);

        this.isEdit = !!result;

        return of(result || this.newBookmark());
      })
    );

    // remember subscription in order to cancel it on component destroy event
    this.subscription = this.bookmark$.subscribe((bookmark: IBookmark) => {
      this.bookmarkName = bookmark.name;
      this.bookmarkURL = bookmark.url;
    });
  }

  public ngOnDestroy(): void {
    // unsubscribe on destroy
    this.subscription.unsubscribe();
  }

  public saveBookmark() {
    // TODO: also add in "created" field as timestamp
    // Used later for filtering
    const bookmark: IBookmark = <IBookmark>{
      id: this.pathId || undefined,
      name: this.bookmarkName,
      url: this.bookmarkURL
    };

    if (!this.isEdit) {
      this.store.dispatch(AddNewBookmark(
        { 
          bookmark: {
            ...bookmark,
            created: (new Date()).toISOString()
          }
        }
      ));
    } else {
      this.store.dispatch(EditBookmark({ bookmark }));
    }

    this.goBack();
  }

  public goBack() {
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
