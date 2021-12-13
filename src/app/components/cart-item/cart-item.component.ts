import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CartsService } from '../../services/carts.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Baguette } from '../../models/baguette';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private cart: CartsService,
    private orderS: OrdersService,
    public auth: AuthenticationService,
    public router: Router
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.cart.getCart(this.route.snapshot.params['id']).subscribe((orders) => {
      this.dataSource = new MatTableDataSource<Baguette>(orders.baguettes);
      this.totalPrice = orders.baguettes.reduce(
        (a, b) => Number(a) + Number(b.price),
        0
      );
      this.dataSource.paginator = this.paginator;
    });
  }

  async order(): Promise<void> {
    if (this.da && this.din) {
      await this.orderS
        .placeOrder({
          userId: 1,
          deliveryAddress: this.da,
          deliveryInfo: this.din,
          baguetteIds: [1, 2]
        })
        .subscribe((ord) => {
          if (ord) {
            this.cart
              .deleteCart(this.route.snapshot.params['id'])
              .subscribe((x) => {
                this.router.navigateByUrl(`/orders/${ord.id}`);
              });
          }
        });
    }
  }
}
