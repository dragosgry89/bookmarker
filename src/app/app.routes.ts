import { Routes } from '@angular/router';
import { List } from './components/list/list';
import { App } from './app';
import { Bookmark } from './components/bookmark/bookmark';

export const routes: Routes = [
    {
        path: '',
        component: List
    },
    {
        path: 'bookmark/:id',
        component: Bookmark
    }
];
