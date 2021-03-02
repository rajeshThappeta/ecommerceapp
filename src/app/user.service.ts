import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCartSize:number=0;

  constructor(private hc:HttpClient,private router:Router) { }

  //create user
  createUser(userObj):Observable<any>{
    return this.hc.post("/user/register",userObj)
  }

  //login user
  loginUser(userCredObj):Observable<any>{
    console.log(userCredObj)
    return this.hc.post("/user/login",userCredObj)
  }

  setCartSize(newSize){
    this.userCartSize=newSize;
  }

  getCartSize(){
    return this.userCartSize;
  }
  getInitialCartSize(username){
    return this.hc.get(`/cart/getsize/${username}`)
  }

  logoutUser(){
    localStorage.clear();
   this.router.navigateByUrl("/home")

  }


  // public messageStream = new BehaviorSubject<number>((+localStorage.getItem("cartsize")));
  // currentMessage = this.messageStream.asObservable()
  
 
  // updateMessage(newMessage: number){
  //   this.messageStream.next(newMessage);
 
  // }


}
