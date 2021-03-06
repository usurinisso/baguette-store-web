import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from '../login-form/login-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '400px',
      height: '300px',
      maxWidth: '400px',
      maxHeight: '300px',
      data: {
        username: this.username,
        password: this.password
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
