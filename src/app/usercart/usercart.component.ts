import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {

  cart=[];
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cart=JSON.parse(localStorage.getItem("userCart"))
    console.log("cart",this.cart)
  }

}
