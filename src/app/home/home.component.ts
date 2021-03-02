import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { CartService } from '../cart.service';

import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products=[];
  constructor(private adminService:AdminService,private router:Router,private userService:UserService,private cartService:CartService) { }

  ngOnInit(): void {
    this.adminService.getProducts().subscribe(
      res=>{
        if(res["message"]=="nonempty"){
        this.products=res["products"]
        console.log(this.products)
        }
      },
      err=>{
        alert("error occurred")
        console.log(err)
      }
    )
  }

  gotoViewProduct(productid){
    this.router.navigateByUrl(`/viewproduct/${productid}`)
  }

  addToCart(product){

    
    let username=JSON.parse(localStorage.getItem("user"))["username"];
    //if no user logged in
    if(username==undefined){
      alert("Please login to continue")
      this.router.navigateByUrl("/login")

    }
    else{
    let selectedProduct={};
    selectedProduct["username"]=username;
    selectedProduct["product"]=product;

    console.log(selectedProduct)
    this.cartService.addToCart(selectedProduct).subscribe(
      res=>{
        alert(res["message"])
    
        console.log("res in home ",res)
        //inform about cartsize to user service
        this.userService.setCartSubjectSize(res["cartsize"])


        // this.userService.setCartSize(res["cartsize"])
        // let cartsize=localStorage.getItem("cartsize")
      
        // cartsize=res["cartsize"]
        // localStorage.setItem("cartsize",cartsize)
        this.router.navigateByUrl(`/userdashboard/${username}`)
      },
      err=>{
        alert("Error occurred")
        console.log(err)
      }
    )
    }
  }
}
