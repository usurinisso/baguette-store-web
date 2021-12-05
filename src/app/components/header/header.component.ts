import { Component, OnInit } from '@angular/core';
import { SideBarService } from '../../services/side-bar.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faBars = faBars;
  private isSideBarOpen = false;
  constructor(private sidenav: SideBarService, private router: Router) {}

  ngOnInit(): void {}

  toggleSideBar(): void {
    this.isSideBarOpen = !this.isSideBarOpen;
    this.sidenav.toggle(this.isSideBarOpen);
  }
  hasRoute(route: string) {
    return this.router.url === route;
  }
}
