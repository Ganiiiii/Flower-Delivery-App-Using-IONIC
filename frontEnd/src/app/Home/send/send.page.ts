import { Component, OnInit } from '@angular/core';
import { ServicService } from 'src/app/shared/servic.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {

  deliverForm:FormGroup;
  flower;
  year;
  date;
  dateTime;
  shops;
  constructor(private serve:ServicService,private fb:FormBuilder,private route:ActivatedRoute,private router:Router,private toastController:ToastController) { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Order Placed..',
      duration: 1000
    });
    toast.present();
  }

  ngOnInit()
  {
    this.deliverForm = this.fb.group({
      reName:[''],
      address:[''],
      contact:[''],
      date:[''],
      message:[''],
      sName:['',Validators.required]
    })
    this.flower = this.serve.getFlower();
     var today = new Date();
     this.year = today.getFullYear();
     if(today.getMonth()+1 > 9)
     {
      if(today.getDate()>9)
      this.date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      else
      this.date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+'0'+today.getDate();
     }
     else
     {
        if(today.getDate()<9)
        this.date = today.getFullYear()+'-'+'0'+(today.getMonth()+1)+'-'+'0'+today.getDate();
       else
       this.date = today.getFullYear()+'-'+'0'+(today.getMonth()+1)+'-'+today.getDate();
     }  
     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
     this.dateTime = this.date+' '+time;

     this.serve.getShops()
     .subscribe((res)=>{console.log('shops:',res);this.shops=res;},(err)=>{console.log(err);
     })
    }

    get reName()
    {
      return this.deliverForm.get('reName');
    }
    get address()
    {
      return this.deliverForm.get('address');
    }
    get contact()
    {
      return this.deliverForm.get('contact');
    }
    get date1()
    {
      return this.deliverForm.get('date');
    }
    get message()
    {
      return this.deliverForm.get('message');
    }

  onSubmit()
  {
    let user:any= this.serve.getUser();
    let date = new Date(this.deliverForm.get('date').value);
    let date1;
    if(date.getMonth()+1 > 9)
    {
     if(date.getDate()>9)
     date1 = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
     else
     date1 = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+'0'+date.getDate();
    }
    else
    {
       if(date.getDate()<9)
       date1 = date.getFullYear()+'-'+'0'+(date.getMonth()+1)+'-'+'0'+date.getDate();
       else
       date1 = date.getFullYear()+'-'+'0'+(date.getMonth()+1)+'-'+date.getDate();
    }  
   
   
    let time =  date.getHours() + ":" + date.getMinutes();
     let obj={
      flName : this.flower.name,
      flImg : this.flower.img,
      senderName : user.fName,
      userId: user._id,
      reName : this.deliverForm.get('reName').value,
      address : this.deliverForm.get('address').value,
      contact : this.deliverForm.get('contact').value,
      date : date1,
      time : time,
      message : this.deliverForm.get('message').value,
      sId: this.deliverForm.get('sName').value
    }
    let data = JSON.stringify(obj);
    this.serve.place(data)
    .subscribe((res)=>{console.log(res);this.router.navigate(['../../../items'],{relativeTo:this.route});this.presentToast();HomePage.badgeNotify();},(err)=>console.log(err));
  }
}
