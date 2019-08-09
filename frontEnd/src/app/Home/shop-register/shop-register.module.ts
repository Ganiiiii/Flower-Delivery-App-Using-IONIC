import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShopRegisterPage } from './shop-register.page';

const routes: Routes = [
  {
    path: '',
    component: ShopRegisterPage
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
  declarations: [ShopRegisterPage]
})
export class ShopRegisterPageModule {}
