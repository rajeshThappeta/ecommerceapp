import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  product:Product;
  constructor(private acr:ActivatedRoute,
    private adminService:AdminService,
    private router:Router,
    private cartService:CartService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.acr.paramMap.subscribe(data=>{
     
      this.adminService.getProductById(data["params"].productid).subscribe(
        res=>{
            this.product=res["product"]
        },
        err=>{
          alert("Error in reading product")
          console.log(err)
        }
      )
    })
  }

  addProductToCart(product){

    
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
        this.userService.setCartSize(res["cartsize"])
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


interface Product{
  productid:number;
  productname:string;
  productdescription:string;
  productimage:string;
  productprice:number;
}