import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicService } from 'src/app/shared/servic.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:FormGroup;
  constructor(private fb:FormBuilder,private serve:ServicService,private router:Router,private toastController:ToastController ) {}

  ngOnInit()
  {
    this.loginForm = this.fb.group({
      userName:['Ganii',Validators.required],
      password:['Roman',Validators.required]
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
    let obj = {
      userName:this.loginForm.get('userName').value,
      password:this.loginForm.get('password').value
    }
    
    let userData = JSON.stringify(obj);
    this.serve.userLogin(userData)
    .subscribe(async(result)=>{console.log(result);
      this.serve.profile(obj.userName);
      this.router.navigate(['home']);
      this.presentToast('Logged in..');
    },err=>{console.log(err);this.presentToast(err.error.message)});
  }

  adminLogin()
  {
    this.router.navigate(['admin-login']);
    
  }
}
