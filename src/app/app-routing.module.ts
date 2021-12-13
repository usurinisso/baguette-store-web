import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './guards/auth.guard';
import { OrdersComponent } from './components/orders/orders.component';
import { ShopsComponent } from './components/shops/shops.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { ShopItemComponent } from './components/shop-item/shop-item.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/shops',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  {
    path: 'orders/:id',
    component: OrderItemComponent,
    canActivate: [AuthGuard]
  },
  { path: 'carts', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'carts/:id', component: CartItemComponent, canActivate: [AuthGuard] },
  { path: 'shops', component: ShopsComponent },
  { path: 'shops/:id', component: ShopItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
