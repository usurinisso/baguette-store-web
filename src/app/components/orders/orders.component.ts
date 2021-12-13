import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OrdersService } from '../../services/orders.service';
import { OrderWithUser } from '../../models/order';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = [
    'Nr.',
    'delivery to',
    'delivery info',
    'delivered',
    'price',
    'user name'
  ];
  dataSource: MatTableDataSource<OrderWithUser>;

  constructor(
    private order: OrdersService,
    public auth: AuthenticationService,
    public router: Router
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.order.getOrders().subscribe((orders) => {
      this.dataSource = new MatTableDataSource<OrderWithUser>(orders);
      this.dataSource.paginator = this.paginator;
    });
  }
}
