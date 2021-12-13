import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoginData } from '../../interfaces/login-data';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

interface Error {
  password: boolean;
  user: boolean;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  error: Error = { user: false, password: false };
  hide: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<LoginFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginData,
    public auth: AuthenticationService,
    public router: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close(true);
    this.router.navigateByUrl('/');
  }

  async onLoginClick(): Promise<void> {
    this.error.user = false;
    this.error.password = false;
    if (this.data.username && this.data.password) {
      const response = await this.auth.login(
        this.data.username,
        this.data.password
      );
      if (!response) {
        this.onNoClick();
      }

      if (response === 401) {
        this.error.password = true;
      }

      if (response === 404) {
        this.error.user = true;
      }
    }
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }

  ngOnInit(): void {}
}
