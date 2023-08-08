import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
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
    private fetchApiData: UserRegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.getUser(username).subscribe((response) => {
        this.user = response;
        this.updatedUser = { ...this.user };
      });
    }
  }

  editProfile(): void {
    this.editMode = true;
  }

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

  cancelEdit(): void {
    // Cancel the edit mode and reset the form to the original user data
    this.editMode = false;
    this.updatedUser = { ...this.user };
  }
}
