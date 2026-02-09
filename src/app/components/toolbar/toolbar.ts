import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [
    RouterModule,
    MatToolbar
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.less',
})
export class Toolbar {

}