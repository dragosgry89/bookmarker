import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBookmark } from '../models/IBookmark';
import { map, Observable } from 'rxjs';

// Standard JSON server port
const BASE_URL = 'http://localhost:3000';

export interface IBookmarkService {
  getBookmarks(): Observable<IBookmark[]>;
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
}
