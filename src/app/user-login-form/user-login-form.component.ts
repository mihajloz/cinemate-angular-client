import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Logs in the user by sending login data to the backend.
   * Saves username and token to local storage on success.
   * Navigates to the movies page and displays a success notification.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result) => {
        console.log(result);
        localStorage.setItem('username', result.user.Username);
        localStorage.setItem('token', result.token);
        this.router.navigate(['movies']);

        this.dialogRef.close(); // close modal on success
        this.snackBar.open('Logged in', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
