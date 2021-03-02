import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {UserService} from '../user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(formRef:NgForm){

      let userObj=formRef.value;
      this.userService.createUser(userObj).subscribe(
        res=>{
          if(res["message"]=="user created"){
            alert("User registration success")
            this.router.navigateByUrl("/login")
          }
          if(res["message"]=="user existed"){
            alert("Username "+userObj.username+ " is already existed.Please choose another")
            formRef.resetForm();
          }
        },
        err=>{
          alert("Something went wrong. Please try again");
          console.log(err)
        }
      )
    
  }
}
