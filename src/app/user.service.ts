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


  cartsize=0;
  private cartSubject: BehaviorSubject<any> = new BehaviorSubject(this.cartsize);

    getCartSubjectSize(): Observable<any> {
        return this.cartSubject.asObservable();
    }

    setCartSubjectSize(cartsize: any) {
        this.cartSubject.next(cartsize);
    }


}
