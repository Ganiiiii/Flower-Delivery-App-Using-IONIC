import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicService {
  userURL = "http://192.168.0.132:3000/user/";
  ordersURL = "http://192.168.0.132:3000/orders/";
  shopURL = "http://192.168.0.132:3000/shops/"
  sFlower;
  userProfile;
  notifyCount=0;
  constructor(private http:HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json'})
  }
  
  //User Profile
  async profile(user)
  {
    await this.http.get(this.userURL+user)
    .subscribe((result)=>{this.userProfile=result;},(error)=>{console.log(error)});
  }
  
  userLogin(userData)
  {
    return this.http.post<any>(this.userURL+'login',userData,this.httpOptions);
  }
 
  userRegister(userData)
  {
    return this.http.post<any>(this.userURL+'register',userData,this.httpOptions);
  }

  //Selected Flower
  flower(flower)
  {
    this.sFlower = flower;
  }
  getFlower()
  {
    return this.sFlower;
  }

  //Placing Order
  getUser()
  {
    return this.userProfile;
  }
  place(data)
  {
    return this.http.post<any>(this.ordersURL+this.userProfile._id,data,this.httpOptions);
  }

  //getting Orders
  getOrders()
  {
    return this.http.get(this.ordersURL+this.userProfile._id);
  }
  //deleting order from order 
  deleteOrder(order)
  {
    let id = order._id+' '+order.userId;
    return this.http.delete(this.ordersURL+id);
  }

  //Update Order
  updateOrder(order)
  {
    return this.http.patch<any>(this.ordersURL,order,this.httpOptions)
  }

  //badge Notify
  getBadgeNotify()
  {
    return this.notifyCount;
  }
  
  //Admin login get orders
  getAdminOrders(sId)
  {
    return this.http.get(this.shopURL+sId);
  }

  //shop Register
  shopRegister(shopData)
  {
    return this.http.post<any>(this.shopURL+'register',shopData,this.httpOptions);
  }

  getShops()
  {
    return this.http.get(this.shopURL);
  }
  
  //get Admins  
  getAdmin(data)
  {
    return this.http.post<any>(this.shopURL+'login',data,this.httpOptions);
  }
}



