import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private hc:HttpClient) { }

  adminLogin(adminObj):Observable<any>{
   return this.hc.post("/admin/login",adminObj)
  }

  addNewProduct(formData):Observable<any>{
    return this.hc.post("/admin/addproduct",formData)
  }
  getProducts():Observable<any>{
    return this.hc.get("/admin/products")
  }
  getProductById(productid):Observable<any>{
   return this.hc.get(`/admin/product/${productid}`)
  }
}
