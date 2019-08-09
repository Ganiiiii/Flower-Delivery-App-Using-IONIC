import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminLoginPage } from './admin-login.page';

const routes: Routes = [
  {
    path: '',
    component: AdminLoginPage
  },
  {
    path:'admin-home/:sId',
    loadChildren: '../admin-home/admin-home.module#AdminHomePageModule'
  },
  { 
    path: 'shop-register',
    loadChildren: '../shop-register/shop-register.module#ShopRegisterPageModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminLoginPage]
})
export class AdminLoginPageModule {}
