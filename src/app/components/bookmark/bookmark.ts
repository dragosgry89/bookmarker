import { Component, inject, Input, OnInit } from '@angular/core';
import { IBookmark } from '../../models/IBookmark';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookmark',
  imports: [],
  templateUrl: './bookmark.html',
  styleUrl: './bookmark.less',
})
export class Bookmark implements OnInit {
  private route = inject(ActivatedRoute);

  public id = '';

  constructor() {}

  public ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') + '';
  }
}
