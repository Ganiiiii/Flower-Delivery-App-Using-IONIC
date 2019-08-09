import { Component, OnInit } from '@angular/core';
import { ServicService } from 'src/app/shared/servic.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {
  orders;
  flagArray=[];
  length;
  icon;
  constructor(private serve:ServicService,private toastController:ToastController,private route:ActivatedRoute,private router:Router) { }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

  ngOnInit()
  {
    this.icon='checkmark';
    let sId = this.route.snapshot.paramMap.get('sId');
    this.serve.getAdminOrders(sId)
    .subscribe((result:any)=>{
      console.log("result.orders:",result.orders);
      this.orders=result.orders;
      for(let i=0;i<this.orders.length;i++)
    this.flagArray[i]=true;
  },(error)=>{console.log(error)});
  }

  searchange(event)
  {
    let i=0;
    const query = event.target.value;
    requestAnimationFrame(() => {
      this.orders.forEach(item => {
        const shouldShow = item.date.indexOf(query) > -1;
        this.flagArray[i]=shouldShow;
        i++;
      });
    }); 
  }

  orderComplete(order)
  {
     this.serve.deleteOrder(order)
    .subscribe((res)=>{console.log(res);this.ngOnInit();this.presentToast('Order Successfully Completed..');},(err)=>console.log(err));
  }

  adminLogOut()
  {
    this.router.navigate(['../../../../login'],{relativeTo:this.route});
    this.presentToast('Admin Log Out..');
  }
 
}
