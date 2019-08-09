import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServicService } from 'src/app/shared/servic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.page.html',
  styleUrls: ['./update-order.page.scss'],
})
export class UpdateOrderPage implements OnInit {
  deliverForm:FormGroup;
  flower;
  year;
  date;
  dateTime;
  constructor(private serve:ServicService,private fb:FormBuilder,private route:ActivatedRoute,private router:Router) { }

  ngOnInit()
  {
    this.deliverForm = this.fb.group({
      reName:[''],
      address:[''],
      contact:[''],
      date:[''],
      message:['']
    })
    this.flower = this.serve.getFlower();   
    console.log(this.flower);
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
     let patchDate = this.flower.date+' '+this.flower.time

     this.deliverForm.patchValue({
       reName:this.flower.reName,
       address:this.flower.address,
       contact:this.flower.contact,
       date:patchDate,
      message:this.flower.message
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
      id : this.flower._id,
      userId:user._id,
      flName : this.flower.flName,
      flImg : this.flower.flImg,
      senderName : this.flower.senderName,
      reName : this.deliverForm.get('reName').value,
      address : this.deliverForm.get('address').value,
      contact : this.deliverForm.get('contact').value,
      date : date1,
      time : time,
      message : this.deliverForm.get('message').value
    }
     console.log(obj);
     let data = JSON.stringify(obj);
     this.serve.updateOrder(data)
     .subscribe((res)=>{console.log(res);this.router.navigate(['../../../items'],{relativeTo:this.route})},(err)=>console.log(err));
  }
}
