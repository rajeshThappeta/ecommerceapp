import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  userCartArray=[];
  constructor(private hc:HttpClient) { }

  addToCart(userSelectedProduct){
  return  this.hc.post("/cart/add",userSelectedProduct)
  }
  getCartByUsername(username){
    return this.hc.get(`/cart/getcart/${username}`)
  }
}
