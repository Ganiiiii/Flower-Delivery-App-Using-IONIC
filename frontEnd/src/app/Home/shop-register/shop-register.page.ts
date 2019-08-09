import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicService } from 'src/app/shared/servic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop-register',
  templateUrl: './shop-register.page.html',
  styleUrls: ['./shop-register.page.scss'],
})
export class ShopRegisterPage implements OnInit {

  registerForm:FormGroup;
  constructor(private fb:FormBuilder,private serve:ServicService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit()
  {
    this.registerForm = this.fb.group({
      sName:['',Validators.required],
      oName:['',Validators.required],
      contact:['',Validators.required],
      address:['',Validators.required],
      userName:['',Validators.required],
      password:['',Validators.required]
    })
  }

  onSubmit()
  {
    let obj = {
      sName:this.registerForm.get('sName').value,
      oName:this.registerForm.get('oName').value,
      contact:this.registerForm.get('contact').value,
      address:this.registerForm.get('address').value,
      userName:this.registerForm.get('userName').value,
      password:this.registerForm.get('password').value
    }
    console.log('ShopData:',obj);
    let ShopData = JSON.stringify(obj);
    this.serve.shopRegister(ShopData)
    .subscribe((res)=>{
      console.log('Shop:',res);
      this.router.navigate(['../../../admin-login'],{relativeTo:this.route});
    },(err)=>{console.log(err)})  
  }
}
