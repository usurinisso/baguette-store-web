import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterFormComponent } from '../register-form/register-form.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  passwordSecond: string;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterFormComponent, {
      width: '400px',
      height: '500px',
      maxWidth: '400px',
      maxHeight: '500px',
      data: {
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        password: this.password,
        passwordSecond: this.passwordSecond
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        this.router.navigateByUrl('/');
      }
      console.log('The dialog was closed');
    });
  }
}
