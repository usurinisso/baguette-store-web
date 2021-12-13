import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { CartsService } from '../../services/carts.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['Nr.', 'User Name', 'Baguettes Count'];
  dataSource: MatTableDataSource<Cart>;

  constructor(
    private cart: CartsService,
    public auth: AuthenticationService,
    public router: Router
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.cart.getCarts().subscribe((orders) => {
      this.dataSource = new MatTableDataSource<Cart>(orders);
      this.dataSource.paginator = this.paginator;
    });
  }
}
