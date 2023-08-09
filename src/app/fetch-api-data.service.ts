import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// API URL that will provide data for the client
const apiUrl = 'https://cinemate.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Helper function to get headers for API requests, including the token from localStorage
  // private getHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('token');
  //   return new HttpHeaders({
  //     Authorization: 'Bearer' + token,
  //   });
  // }

  // Helper function to extract the response data from the API response
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Makes an API call for user registration.
   * @param userDetails - The user details to be registered.
   * @returns An observable containing the API response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails) // Making a POST request to the 'users' endpoint with the provided user details
      .pipe(catchError(this.handleError)); // Handling errors using the handleError function
  }

  /**
   * Makes an API call for user login.
   * @param userDetails - The user details for login.
   * @returns An observable containing the API response.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to fetch all movies.
   * @returns An observable containing the API response.
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to fetch a movie by its title.
   * @param title - The title of the movie to fetch.
   * @returns An observable containing the API response.
   */
  public getMovieByTitle(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }) // Making a GET request to the 'movies' endpoint with the movie title as a parameter and the required headers
      .pipe(map(this.extractResponseData), catchError(this.handleError)); // Mapping the response data and handling errors
  }

  /**
   * Makes an API call to fetch movies by a specific director's name.
   * @param directorName - The name of the director.
   * @returns An observable containing the API response.
   */
  public getDirectorByName(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to fetch movies by a specific genre name.
   * @param genreName - The name of the genre.
   * @returns An observable containing the API response.
   */
  public getMoviesByGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/genres/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to fetch a user by their username.
   * @param Username - The username of the user.
   * @returns An observable containing the API response.
   */
  public getUser(Username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${Username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to fetch a user's favorite movies.
   * @param Username - The username of the user.
   * @returns An observable containing the API response.
   */
  public getFavoriteMovies(Username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${Username}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to add a movie to a user's favorites.
   * @param Username - The username of the user.
   * @param MovieID - The ID of the movie to add to favorites.
   * @returns An observable containing the API response.
   */
  public addMovieToFavorites(
    Username: string,
    MovieID: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    return (
      this.http
        .post(
          apiUrl + `users/${Username}/movies/${MovieID}`,
          {},
          {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + token,
            }),
          }
        )
        // Making a POST request to the 'users' endpoint with the username and movie ID as parameters and the required headers
        .pipe(map(this.extractResponseData), catchError(this.handleError))
    );
  }

  /**
   * Makes an API call to delete a movie from a user's favorites.
   * @param Username - The username of the user.
   * @param MovieID - The ID of the movie to remove from favorites.
   * @returns An observable containing the API response.
   */
  public deleteMovieFromFavorites(
    Username: string,
    MovieID: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${Username}/movies/${MovieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }) // Making a DELETE request to the 'users' endpoint with the username and movie ID as parameters and the required headers
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Checks if a movie is in the user's favorites.
   * @param MovieID - The ID of the movie to check.
   * @returns Whether the movie is in the user's favorites.
   */
  public isFavoriteMovie(MovieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies && user.FavoriteMovies.indexOf(MovieID) >= 0;
  }

  /**
   * Makes an API call to edit a user's details.
   * @param Username - The username of the user to edit.
   * @param updatedUser - The updated user details.
   * @returns An observable containing the API response.
   */
  public editUser(Username: string, updatedUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + `users/${Username}`, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }) // Making a PUT request to the 'users' endpoint with the username as a parameter, the updated user details, and the required headers
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to delete a user.
   * @param Username - The username of the user to delete.
   * @returns An observable containing the API response.
   */
  public deleteUser(Username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${Username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text', // Set the responseType to 'text' to handle plain text response
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Private function to handle HTTP errors and provide appropriate error messages
  // private handleError(error: HttpErrorResponse): any {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('Some error occurred:', error.error.message);
  //   } else {
  //     console.error(
  //       `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
  //     );
  //   }
  //   return throwError('Something bad happened; please try again later.');
  // }

  private handleError(error: HttpErrorResponse): any {
    console.error('Full error response:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
