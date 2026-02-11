import { Component, inject } from '@angular/core';

import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './delete-confirm-dialog.html',
  styleUrl: './delete-confirm-dialog.less',
})
export class DeleteConfirmDialog {
  public readonly dialogRef = inject(MatDialogRef<DeleteConfirmDialog>);

  public onCancel() {
    this.dialogRef.close(false);
  }

  public onConfirm() {
    this.dialogRef.close(true);
  }
}
