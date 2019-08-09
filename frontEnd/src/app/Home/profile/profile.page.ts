import { Component, OnInit } from '@angular/core';
import { ServicService } from 'src/app/shared/servic.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userProfile;
  constructor(private serve:ServicService) { }

  ngOnInit()
  {
    this.userProfile = this.serve.getUser();
    console.log('user:',this.userProfile);
    
  }

}
