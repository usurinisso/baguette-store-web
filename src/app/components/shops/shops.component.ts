import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ShopsService } from '../../services/shops.service';
import { Shop } from '../../models/shop';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  displayedColumns: string[] = [
    'Nr.',
    'Image',
    'Address',
    'Phone',
    'Work Hours'
  ];
  dataSource: MatTableDataSource<Shop>;

  constructor(
    private shop: ShopsService,
    public auth: AuthenticationService,
    public router: Router
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.shop.getShops().subscribe((shops) => {
      this.dataSource = new MatTableDataSource<Shop>(shops);
      this.dataSource.paginator = this.paginator;
    });
  }
}
