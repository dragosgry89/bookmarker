import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { Store } from '@ngrx/store';
import { debounceTime, filter, Observable, Subject, Subscription, switchMap } from 'rxjs';

import { IBookmarksState } from '../../store/reducers/reducers';
import { SearchTextChanged } from '../../store/actions/actions';
import * as BookmarksSelectors from '../../store/selectors/selectors';

const DEBOUNCE_TIME = 300;

@Component({
  selector: 'app-toolbar',
  imports: [
    FormsModule,
    RouterModule,
    MatToolbar,
    MatIcon
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.less',
})
export class Toolbar implements OnInit, OnDestroy {
  public onHomePage: boolean = false;
  public searchTextValue: string = '';

  private router = inject(Router);
  private searchTextSubject$  = new Subject<string>();
  private searchTextSubscription: Subscription;

  constructor(private store: Store<IBookmarksState>) {
    this.searchTextSubscription = this.searchTextSubject$.pipe(
      debounceTime(DEBOUNCE_TIME)
    ).subscribe((value) => {
      console.log('searching for ...', value);

      this.store.dispatch(SearchTextChanged({ value }));
    });
    
    this.store.select(BookmarksSelectors.searchText)
      .subscribe((value) => {
        this.searchTextValue = value;
      })
  }

  public ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        this.onHomePage = event?.url === '/';
      });
  }

  public searchBookmarks($event: any) {
    const value = ($event.target as HTMLInputElement).value;

    this.searchTextSubject$.next(value);
  }

  public ngOnDestroy(): void {
    this.searchTextSubscription.unsubscribe();
  }
}
