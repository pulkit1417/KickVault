import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { MyCartComponent } from './my-cart/my-cart.component'
import { sellerAuthGuard } from './seller-auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'seller-auth',component: SellerAuthComponent},
  {path:'seller-home',component:SellerHomeComponent,canActivate:[sellerAuthGuard]},
  {path:'user-auth',component:UserAuthComponent},
  {path:'my-cart',component:MyCartComponent},
  {path:'seller-add-product',component:SellerAddProductComponent,canActivate:[sellerAuthGuard]},
  {path:'seller-update-product/:id',component:SellerUpdateProductComponent,canActivate:[sellerAuthGuard]},
  {path:'details/:productId',component:ProductDetailsComponent},
  {path:'checkout',component:CheckoutComponent}
];
