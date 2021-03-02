import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  username;
  userCartSize;
  constructor(private userService:UserService,
              private router:Router,
              private cartService:CartService) { }

  ngOnInit(): void {
    this.cartStatus();
  }


  cartStatus(){
    this.username=JSON.parse(localStorage.getItem("user"))["username"]
    this.userService.getInitialCartSize( JSON.parse(localStorage.getItem("user"))["username"]).subscribe(
      res=>{
        this.userCartSize=res["cartsize"]

        // this.userService.currentMessage.subscribe(c=>{
        //   this.userCartSize=c;
        // })
    
        localStorage.setItem("cartsize",this.userCartSize)
        console.log(res["userCart"])
       localStorage.setItem("userCart",JSON.stringify(res["userCart"]))
      },
      err=>{
        alert("Error occurred")
        console.log(err)
      }
    )
  }
  showUserCart(){
  //  this.router.navigateByUrl(`userdashboard/${JSON.parse(localStorage.getItem("user"))["username"]}/usercart`)
  this.router.navigateByUrl('/usercart')
  }

  userLogout(){
    this.userService.logoutUser();
  }


 
}
