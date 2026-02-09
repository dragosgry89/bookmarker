import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBookmark } from '../models/IBookmark';
import { map, Observable, tap } from 'rxjs';

// Standard JSON server port
const BASE_URL = 'http://localhost:3000';

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
    return this.http.get(BASE_URL + '/bookmarks')
      .pipe(
        map((data: any) => data || [])
      )
  }

  public createBookmark(bookmark: IBookmark): Observable<any> {
    return this.http.post(BASE_URL + '/bookmarks', bookmark);
  }
}
