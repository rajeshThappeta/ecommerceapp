import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AdminService} from '../admin.service'
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private adminService:AdminService,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
  }

  onSubmit(formRef){

    let obj=formRef.value;
    if(obj.usertype=="user"){
      this.userService.loginUser(obj).subscribe(
        res=>{
          if(res["message"]=="success"){
            localStorage.setItem("token",res["token"])
            let userObj=JSON.stringify(res["user"])
            localStorage.setItem("user",userObj)
            this.router.navigateByUrl(`/userdashboard/${JSON.parse(localStorage.getItem("user"))["username"]}`)
          }
          else{
            alert(res["message"])
          }
        },
        err=>{
          alert("Error occurred")
          console.log(err)
        }
      )
    }

    //if admin
    if(obj.usertype=="admin"){
      this.adminService.adminLogin(obj).subscribe(
        res=>{
          localStorage.setItem("token",res["token"])
          localStorage.setItem("admin",res["username"])
          this.router.navigateByUrl("/admin")
        },
        err=>{
          alert("Error occurred")
          console.log(err)
        }
      )
    }

    }

 
    
}

