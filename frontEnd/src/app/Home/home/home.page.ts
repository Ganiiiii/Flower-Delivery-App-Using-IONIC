import { Component, OnInit, OnDestroy, ɵConsole } from '@angular/core';
import { Router, RouterEvent, ActivatedRoute } from '@angular/router';
import {OrdersPageModule} from '../orders/orders.module';
import { ServicService } from 'src/app/shared/servic.service';
import { LoginPage } from 'src/app/authorization/login/login.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{
  
   pages = [
      {
      title: 'Profile',
      url: '/home/profile',
      icon: 'person'
    },
    {
      title: 'Orders',
      url: '/home/orders',
      icon: 'done-all'
    },
    {
      title: 'Items',
      url: '/home/items',
      icon: 'flower'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'exit'
    }
  ];

  selectedPath = '';
   static badgeCount: any='';
  constructor(private router: Router,private serve:ServicService,private route:ActivatedRoute)
  {
  }
  ngOnInit()
  { 
  } 
  static badgeNotify()
  {
    this.badgeCount++; 
  }
  static count()
  {
    console.log(this.badgeCount);
  }
  get badge()
  {
    return HomePage.badgeCount;
  }
  static setBadgeCount()
  {
    this.badgeCount = '';    
  }
}
