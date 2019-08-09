import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage ,
    children : [
      {
        path: '',
        redirectTo: 'items'
      },
      {
        path: 'items',
        loadChildren: '../items/items.module#ItemsPageModule'
      },
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule'
      },
      {
        path: 'orders',
        loadChildren: '../orders/orders.module#OrdersPageModule'
      },
      {
        path: 'send/:flower',
        loadChildren: '../send/send.module#SendPageModule'
      },
      {
        path: 'update/:flower',
        loadChildren: '../update-order/update-order.module#UpdateOrderPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
