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
    private router: Router,
    private snackBar: MatSnackBar
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

  isFavoriteMovie(movieID: string): boolean {
    return this.fetchApiData.isFavoriteMovie(movieID);
  }

  toggleFavoriteMovie(movieID: string): void {
    const username = localStorage.getItem('username') || '';

    if (this.isFavoriteMovie(movieID)) {
      this.removeFromFavorites(username, movieID);
    } else {
      this.addToFavorites(username, movieID);
    }
  }

  addToFavorites(username: string, movieID: string): void {
    this.fetchApiData.addMovieToFavorites(username, movieID).subscribe(
      (response) => {
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        console.error(error);
        this.snackBar.open('Failed to add to favorites.', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  removeFromFavorites(username: string, movieID: string): void {
    this.fetchApiData.deleteMovieFromFavorites(username, movieID).subscribe(
      (response) => {
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        console.error(error);
        this.snackBar.open('Failed to remove from favorites.', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  // toggleFavoriteMovie(movieID: string): void {
  //   const username = localStorage.getItem('username') || '';

  //   if (this.fetchApiData.isFavoriteMovie(movieID)) {
  //     this.fetchApiData.deleteMovieFromFavorites(username, movieID).subscribe(
  //       (response) => {
  //         this.snackBar.open('Removed from favorites!', 'OK', {
  //           duration: 2000,
  //         });
  //       },
  //       (error) => {
  //         console.error(error);
  //         this.snackBar.open('Failed to remove from favorites.', 'OK', {
  //           duration: 2000,
  //         });
  //       }
  //     );
  //   } else {
  //     this.fetchApiData.addMovieToFavorites(username, movieID).subscribe(
  //       (response) => {
  //         this.snackBar.open('Added to favorites!', 'OK', {
  //           duration: 2000,
  //         });
  //       },
  //       (error) => {
  //         console.error(error);
  //         this.snackBar.open('Failed to add to favorites.', 'OK', {
  //           duration: 2000,
  //         });
  //       }
  //     );
  //   }
  // }
}
