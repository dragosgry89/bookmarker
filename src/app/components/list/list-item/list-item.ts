import { Component, Input } from '@angular/core';

import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

import { IBookmark } from '../../../models/IBookmark';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-item',
  imports: [
    CommonModule,
    RouterModule,
    MatCard,
    MatCardContent,
    MatIcon
  ],
  templateUrl: './list-item.html',
  styleUrl: './list-item.less',
})
export class ListItem {
  @Input()
  public bookmark: IBookmark = <IBookmark>{};
}
