import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicService } from 'src/app/shared/servic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { HomePage } from '../home/home.page';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  
  orders;
  badgeCount;
  flag=1;
  constructor(private serve:ServicService,private router:Router,private route:ActivatedRoute,private navCtrl:NavController,private toastController:ToastController)
  {
    if(this.flag===1)
    {
      this.flag = 0;
      route.params.subscribe(val => {
        this.serve.getOrders()
      .subscribe((result:any)=>{console.log('Orders:',result);this.orders=result[0].orders;HomePage.setBadgeCount();},(error)=>console.log(error));
      });
    } 
    
  }
  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Order Canceled..',
      duration: 1000  
    });
    toast.present();
  }

   ngOnInit()
  {
    if(this.flag === 1)
    {
      this.serve.getOrders()
    .subscribe((result:any)=>{console.log('Orders:',result);this.orders=result[0].orders;},(error)=>console.log(error));
    }
    this.flag = 1;
  }
  
  deleteOrder(order)
  {
    this.serve.deleteOrder(order)
    .subscribe((res)=>{console.log(res);this.ngOnInit();this.presentToast();},(err)=>console.log(err));
  }
  editOrder(order)
  {
    this.serve.flower(order);
    this.router.navigate(['../../update',order.flName],{relativeTo:this.route});
  }
}
