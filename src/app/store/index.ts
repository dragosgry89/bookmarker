import { ActionReducerMap, State } from '@ngrx/store';
import * as fromBookmarksReducer from './reducers/reducers';
import { BookmarksEffects } from './effects/effects';

export interface IAppState {
    bookmarksState: fromBookmarksReducer.IBookmarksState
};

export const reducers: ActionReducerMap<IAppState> = {
    'bookmarksState': fromBookmarksReducer.bookmarksReducer
};

export const effects = [
    BookmarksEffects
];
