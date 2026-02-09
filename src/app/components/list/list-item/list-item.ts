import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { IBookmark } from '../../../models/IBookmark';

@Component({
  selector: 'app-list-item',
  imports: [
    MatCard,
    MatCardContent
  ],
  templateUrl: './list-item.html',
  styleUrl: './list-item.less',
})
export class ListItem {
  @Input()
  public bookmark: IBookmark = <IBookmark>{};
}
