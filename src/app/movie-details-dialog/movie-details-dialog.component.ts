import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details-dialog',
  templateUrl: './movie-details-dialog.component.html',
  styleUrls: ['./movie-details-dialog.component.css'],
})
export class MovieDetailsDialogComponent {
  /**
   * Constructs the MovieDetailsDialogComponent.
   * @param dialogRef - The MatDialogRef for the movie details dialog.
   * @param data - The data injected into the dialog.
   */
  constructor(
    public dialogRef: MatDialogRef<MovieDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  /**
   * Closes the movie details dialog.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
