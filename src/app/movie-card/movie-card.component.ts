import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  movies: any[] = [];

  @ViewChild('dialogTemplate')
  private dialogTemplate!: TemplateRef<any>;

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openDialog(movie: any, type: string): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      width: '400px',
      data: {
        movie,
        type,
      },
    });
  }

  viewUserProfile(): void {
    this.router.navigate(['/profile']);
  }
}
