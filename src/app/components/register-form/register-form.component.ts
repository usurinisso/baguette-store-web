import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterData } from '../../interfaces/register-data';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup;
  userName: string;
  lastName: string;
  firstName: string;
  password: string;
  passwordSecond: string;

  passwordError: boolean = false;
  otherError: boolean = false;
  passwordNoMatch: boolean = false;
  userExists: boolean = false;

  constructor(
    fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegisterData,
    private auth: AuthenticationService,
    public router: Router
  ) {
    this.password = data.password;
    this.passwordSecond = data.passwordSecond;
    this.lastName = data.lastName;
    this.firstName = data.firstName;
    this.userName = data.userName;
    this.form = fb.group({
      userName: [this.userName, [Validators.required]],
      firstName: [this.firstName, [Validators.required]],
      lastName: [this.lastName, [Validators.required]],
      password: [this.password, [Validators.required, Validators.minLength(5)]],
      passwordSecond: [
        this.passwordSecond,
        [Validators.required, Validators.minLength(5)]
      ]
    });
  }

  async onLoginClick(): Promise<void> {
    this.otherError =
      this.form.controls['firstName'].hasError('required') ||
      this.form.controls['lastName'].hasError('required') ||
      this.form.controls['userName'].hasError('required') ||
      this.form.controls['password'].hasError('required') ||
      this.form.controls['passwordSecond'].hasError('required');

    this.passwordError =
      this.form.controls['password'].hasError('minlength') ||
      this.form.controls['passwordSecond'].hasError('minlength');

    this.passwordNoMatch =
      this.form.controls['password'].value !==
      this.form.controls['passwordSecond'].value;

    if (!this.passwordNoMatch && !this.otherError && !this.passwordError) {
      const result = await this.auth.register({
        userName: this.form.controls['userName'].value,
        firstName: this.form.controls['firstName'].value,
        lastName: this.form.controls['lastName'].value,
        passwordSecond: this.form.controls['passwordSecond'].value,
        password: this.form.controls['password'].value
      });

      if (result === 200) {
        this.onNoClick();
      }

      if (result === 500) {
        this.userExists = true;
      }
    }
    // if (await this.auth.login(this.data.username, this.data.password)) {
    //   this.onNoClick();
    // }
  }

  onNoClick(): void {
    this.dialogRef.close(true);
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }

  ngOnInit(): void {}
}
