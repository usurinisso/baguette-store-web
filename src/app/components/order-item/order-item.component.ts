import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Baguette } from '../../models/baguette';
import { ActivatedRoute, Router } from '@angular/router';
import { CartsService } from '../../services/carts.service';
import { OrdersService } from '../../services/orders.service';
import { AuthenticationService } from '../../services/authentication.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  displayedColumns: string[] = [
    'Nr.',
    'Price',
    'SizeCm',
    'Description',
    'Type',
    'Condition',
    'BakedAt'
  ];
  dataSource: MatTableDataSource<Baguette>;

  totalPrice: number;
  da: string;
  din: string;
  d: boolean;

  constructor(
    private route: ActivatedRoute,
    private cart: CartsService,
    private orderS: OrdersService,
    public auth: AuthenticationService,
    public router: Router
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.orderS
      .getOrder(this.route.snapshot.params['id'])
      .subscribe((orders) => {
        this.da = orders.deliveryAddress;
        this.din = orders.deliveryInfo;
        this.d = orders.delivered;

        this.dataSource = new MatTableDataSource<Baguette>(orders.baguettes);
        this.totalPrice = orders.baguettes.reduce(
          (a, b) => Number(a) + Number(b.price),
          0
        );
        this.dataSource.paginator = this.paginator;
      });
  }
}
