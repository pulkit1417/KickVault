import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { sellerAuthGuard } from './seller-auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'seller-auth',component: SellerAuthComponent},
  {path:'seller-home',component:SellerHomeComponent,canActivate:[sellerAuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'cart',component:CartComponent},
  {path:'seller-add-product',component:SellerAddProductComponent,canActivate:[sellerAuthGuard]},
  {path:'seller-update-product/:id',component:SellerUpdateProductComponent,canActivate:[sellerAuthGuard]},
  {path:'details/:productId',component:ProductDetailsComponent}
];
