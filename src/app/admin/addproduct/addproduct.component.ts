import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  constructor(private hc:HttpClient,private adminService:AdminService) { }

  ngOnInit(): void {
  }

  file:File; 
  incomingfile(event) { 
    this.file= event.target.files[0]; 
  }

  formData=new FormData();
   onSubmit(formRef) { 
     let userObj=formRef.value;
    //adding image and other data to FormData object
     this.formData.append('photo',this.file,this.file.name); 
     this.formData.append("userObj",JSON.stringify(userObj)) 
    this.adminService.addNewProduct(this.formData).subscribe(
      res=>{
        alert(res["message"])
      },
      err=>{
        alert("Something went wrong in creating new product")
        console.log(err)
      }
    )
     }


}
