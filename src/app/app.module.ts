import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { interceptor } from './interceptor';
import { GlobalVariables } from './globalVariables';
import { HeaderComponent } from './user/header/header.component';
import { MainPageComponent } from './user/main-page/main-page.component';
import { MultipleCarouselComponent } from './user/multiple-carousel/multiple-carousel.component';
import { ProductListComponent } from './user/product-list/product-list.component';
import { ProductDetailinformationComponent } from './user/product-detailinformation/product-detailinformation.component';
import { ShoppingCartComponent } from './user/shopping-cart/shopping-cart.component';

import { RouterModule, Routes, RouterLink } from '@angular/router';
import { FavoriteComponent } from './user/favorite/favorite.component';
import { ProductlistWidthPaginationComponent } from './user/productlist-width-pagination/productlist-width-pagination.component';
import { FactAndQuestionsComponent } from './user/fact-and-questions/fact-and-questions.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AMainPageComponent } from './admin/a-main-page/a-main-page.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AHeaderComponent } from './admin/a-header/a-header.component';
import { ACategoriesComponent } from './admin/a-categories/a-categories.component';
import { AProductsComponent } from './admin/a-products/a-products.component';
import { AUsersListComponent } from './admin/a-users-list/a-users-list.component';
import { AReportsComponent } from './admin/a-reports/a-reports.component';
import { AOptionsComponent } from './admin/a-options/a-options.component';

import { MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { changeFavoriteIcons } from './changeFavoriteIcons';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { uploadImage } from './uploadImage';

const routes: Routes = [
  { path: '', component: ErrorPageComponent, pathMatch: 'full' },//თუ არაფერი არ გადაეცა
  {
    path: 'user',
    children: [
      { path: 'home', component: MainPageComponent },
      { path: 'productList/:categoryCode', component: ProductListComponent },
      { path: 'productDetailInformation/:id', component: ProductDetailinformationComponent },
      { path: 'shoppingCart', component: ShoppingCartComponent },
      { path: 'favorite/:categoryCode', component: FavoriteComponent },
      { path: 'faq', component: FactAndQuestionsComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  },
  {
    path: 'admin',
    children: [
      {path: 'home', component: AMainPageComponent},
      {path: 'categories', component: ACategoriesComponent},
      {path: 'products', component: AProductsComponent},
      {path: 'users', component: AUsersListComponent},
      {path: 'reports', component: AReportsComponent},
      {path: 'options', component: AOptionsComponent}
    ]
  },
  { path: '**', component: ErrorPageComponent },//თუ ისეთი სახელი გადაეცა, რომელიც არ არსებობს
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    MultipleCarouselComponent,
    ProductListComponent,
    ProductDetailinformationComponent,
    ShoppingCartComponent,
    FavoriteComponent,
    ProductlistWidthPaginationComponent,
    FactAndQuestionsComponent,
    ProfileComponent,
    ErrorPageComponent,
    AMainPageComponent,
    DashboardComponent,
    AHeaderComponent,
    ACategoriesComponent,
    AProductsComponent,
    AUsersListComponent,
    AReportsComponent,
    AOptionsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    FormsModule,

    //კალენდარს ჭირდება
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: interceptor,
      multi: true
    },
    GlobalVariables,
    changeFavoriteIcons,
    DatePipe,
    uploadImage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
