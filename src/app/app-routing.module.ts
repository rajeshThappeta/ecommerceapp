import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import {UsercartComponent} from './usercart/usercart.component'


const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"viewproduct/:productid",component:ViewproductComponent},
  {path:"userdashboard/:username",component:UserdashboardComponent},
 // {path:"usercart",component:UsercartComponent},
  {path:"",redirectTo:"home",pathMatch:"full"},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
