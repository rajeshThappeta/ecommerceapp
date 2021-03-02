import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  products=[];
  productsStatus:boolean=false;
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getProducts().subscribe(
      res=>{
        if(res["message"]=="empty"){
              this.productsStatus=true;
        }
        if(res["message"]=="nonempty"){
          this.products=res["products"]
        }
      },
      err=>{
        alert("Error on fetcing products..Please try again")
        console.log(err)
      }
    )
  }

}
