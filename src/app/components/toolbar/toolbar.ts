import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [
    RouterModule,
    MatToolbar,
    MatIcon
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.less',
})
export class Toolbar {

}