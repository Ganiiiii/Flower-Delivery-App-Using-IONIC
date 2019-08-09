import { Component, OnInit } from '@angular/core';
import { ServicService } from 'src/app/shared/servic.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm:FormGroup;
  constructor(private serve:ServicService,private fb:FormBuilder,private router:Router,private toastController:ToastController) { }

  ngOnInit()
  {
    this.registerForm = this.fb.group({
      fName:['',Validators.required],
      contact:['',Validators.required],
      userName:['',Validators.required],
      password:['',Validators.required]
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Register Successfully..',
      duration: 1000
    });
    toast.present();
  }
  onSubmit()
  {
    let obj = {
      fName:this.registerForm.get('fName').value,
      contact:this.registerForm.get('contact').value,
      userName:this.registerForm.get('userName').value,
      password:this.registerForm.get('password').value
    }
    let userData = JSON.stringify(obj);
    this.serve.userRegister(userData)
    .subscribe(result=>{console.log(result);this.router.navigate(['/login']);this.presentToast();},err=>console.log(err));

  }

}
