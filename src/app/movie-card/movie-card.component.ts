import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
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
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook called after component initialization.
   * Retrieves the list of movies.
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Retrieves the list of movies from the API.
   * @returns An array of movie data.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens a movie details dialog.
   * @param movie - The movie object to display details for.
   * @param type - The type of details (e.g., synopsis, director, genre).
   */
  openDialog(movie: any, type: string): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      width: '400px',
      data: {
        movie,
        type,
      },
    });
  }

  /**
   * Navigates to the user profile page.
   */
  viewUserProfile(): void {
    this.router.navigate(['/profile']);
  }

  /**
   * Checks if a movie is in the user's favorites.
   * @param movieID - The ID of the movie to check.
   * @returns Whether the movie is in the user's favorites.
   */
  isFavoriteMovie(movieID: string): boolean {
    return this.fetchApiData.isFavoriteMovie(movieID);
  }

  /**
   * Toggles the favorite status of a movie.
   * @param movieID - The ID of the movie to toggle.
   */
  toggleFavoriteMovie(movieID: string): void {
    const username = localStorage.getItem('username') || '';

    if (this.isFavoriteMovie(movieID)) {
      this.removeFromFavorites(username, movieID);
    } else {
      this.addToFavorites(username, movieID);
    }
  }

  /**
   * Adds a movie to the user's favorites.
   * @param username - The username of the user.
   * @param movieID - The ID of the movie to add to favorites.
   */
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

  /**
   * Removes a movie from the user's favorites.
   * @param username - The username of the user.
   * @param movieID - The ID of the movie to remove from favorites.
   */
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
}
