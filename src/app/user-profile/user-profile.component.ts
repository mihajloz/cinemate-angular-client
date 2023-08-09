import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  updatedUser: any;
  editMode: boolean = false;

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  /**
   * Lifecycle hook called after component initialization.
   * Retrieves the user profile information.
   */
  ngOnInit(): void {
    this.getUserProfile();
  }

  /**
   * Retrieves the user's profile information from the API.
   */
  getUserProfile(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.getUser(username).subscribe((response) => {
        this.user = response;
        this.updatedUser = { ...this.user };
      });
    }
  }

  /**
   * Enables the edit mode for user profile.
   */
  editProfile(): void {
    this.editMode = true;
  }

  /**
   * Saves the updated user profile information to the backend.
   * Updates the user variable and disables edit mode on success.
   */
  saveProfile(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.editUser(username, this.updatedUser).subscribe(() => {
        // Update the user variable with the updated user data
        this.user = { ...this.updatedUser };
        this.editMode = false;
      });
    }
  }

  /**
   * Deletes the user profile from the backend.
   * Redirects to the login page on success.
   */
  deleteProfile(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.deleteUser(username).subscribe(
        () => {
          // If the user profile is deleted, redirect to the login page
          this.router.navigate(['/welcome']);
        },
        (error) => {
          console.error(error);
          // Display an error message or handle the error appropriately
        }
      );
    }
  }

  /**
   * Cancels the edit mode and resets the form to the original user data.
   */
  cancelEdit(): void {
    this.editMode = false;
    this.updatedUser = { ...this.user };
  }
}
