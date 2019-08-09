import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'home',
    loadChildren: '../../Home/home/home.module#HomePageModule'
  },
  {
    path: 'register',
    loadChildren: '../register/register.module#RegisterPageModule'
  },
  {
    path: 'admin-login',
    loadChildren: '../../Home/admin-login/admin-login.module#AdminLoginPageModule'
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
  declarations: [LoginPage]
})
export class LoginPageModule {}
