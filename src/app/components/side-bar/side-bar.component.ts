import { Component, OnInit, ViewChild } from '@angular/core';
import { SideBarService } from '../../services/side-bar.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @ViewChild(MatSidenav) sideBar!: MatSidenav;

  constructor(private sidenav: SideBarService, private router: Router) {}

  ngOnInit(): void {
    this.sidenav.isOpen().subscribe((isOpen) => this.sideBar.toggle(isOpen));
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
