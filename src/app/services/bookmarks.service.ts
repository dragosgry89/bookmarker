import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBookmark } from '../models/IBookmark';
import { map, Observable, tap } from 'rxjs';

// Standard JSON server port
const BASE_URL = 'http://localhost:3000';

const bookmarksURI = '/bookmarks';

export interface IBookmarkService {
  getBookmarks(): Observable<IBookmark[]>;
  createBookmark(bookmark: IBookmark): Observable<any>;
}

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  constructor(private http: HttpClient) {}

  public getBookmarks(): Observable<IBookmark[]> {
    return this.http.get(BASE_URL + bookmarksURI)
      .pipe(
        map((data: any) => data || [])
      )
  }

  public createBookmark(bookmark: IBookmark): Observable<any> {
    return this.http.post(
      BASE_URL + bookmarksURI, 
      bookmark
    );
  }

  public editBookmark(bookmark: IBookmark): Observable<any> {
    return this.http.put(
      BASE_URL + bookmarksURI + '/' + bookmark.id, 
      bookmark
    );
  }

  public deleteBookmark(bookmarkId: string): Observable<any> {
    return this.http.delete(
      BASE_URL + bookmarksURI + '/' + bookmarkId
    );
  }
}
