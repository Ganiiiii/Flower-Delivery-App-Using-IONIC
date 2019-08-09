import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicService } from 'src/app/shared/servic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
})
export class AdminLoginPage implements OnInit {
  loginForm:FormGroup;
  constructor(private fb:FormBuilder,private serve:ServicService,private router:Router,private toastController:ToastController,private route:ActivatedRoute) {}

  ngOnInit()
  {
    this.loginForm = this.fb.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    })
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

  onSubmit()
  {
    let userName=this.loginForm.get('userName').value;
    let password=this.loginForm.get('password').value;
    let obj = {
      userName:userName,
      password:password
    }
    let data = JSON.stringify(obj);
    this.serve.getAdmin(data)
      .subscribe(async(result)=>{console.log('result:',result);
      if(result !== 'undefined')
      {
        this.router.navigate(['admin-home/',result.shop._id],{relativeTo:this.route});this.presentToast('Logged in...');
      }
     },err=>{console.log('error:',err);this.presentToast(err.error.message)});
  }     

  shopRegister()
  {
    this.router.navigate(['shop-register'],{relativeTo:this.route});
  }
}
