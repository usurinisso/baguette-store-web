import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Baguette } from '../../models/baguette';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MatPaginator } from '@angular/material/paginator';
import { ShopsService } from '../../services/shops.service';
import { CartsService } from '../../services/carts.service';
import { firstValueFrom } from 'rxjs';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit {
  displayedColumns: string[] = [
    'Nr.',
    'images',
    'Price',
    'SizeCm',
    'Description',
    'Type',
    'Condition',
    'BakedAt',
    'actions'
  ];
  dataSource: MatTableDataSource<Baguette>;

  totalPrice: number;
  da: string;
  din: string;
  d: boolean;
  inCart: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private shopS: ShopsService,
    private cartS: CartsService,
    public auth: AuthenticationService,
    public prof: ProfileService,
    public router: Router
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.shopS
      .getBaguettes(this.route.snapshot.params['id'])
      .subscribe((baguettes) => {
        this.dataSource = new MatTableDataSource<Baguette>(baguettes);
        this.dataSource.paginator = this.paginator;
      });
    const user = this.auth.currentUserValue;
    if (user) {
      const thisCart = this.auth.currentUserValue.cart?.id;
      if (thisCart) {
        this.cartS
          .getCart(thisCart)
          .subscribe((x) => (this.inCart = x.baguettes.map((x) => x.id)));
      }
    }
  }

  async addToCart(id: number) {
    const user = this.auth.currentUserValue;
    if (user) {
      const thisCart = this.auth.currentUserValue.cart?.id;
      if (thisCart) {
        const cart = await firstValueFrom(this.cartS.getCart(thisCart));

        this.cartS
          .patchCart(thisCart, [...cart.baguettes.map((x) => x.id), id])
          .subscribe(async (x) => {
            this.inCart.push(id);
            const a = await this.prof.getUserProfile();
            this.auth.setNewProf(a);
          });
      } else {
        this.cartS
          .postCart(this.auth.currentUserValue.id, [id])
          .subscribe(async (x) => {
            this.inCart.push(id);
            const a = await this.prof.getUserProfile();
            this.auth.setNewProf(a);
          });
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  check(id: number) {
    return !this.inCart.some((x) => id === x);
  }
}
