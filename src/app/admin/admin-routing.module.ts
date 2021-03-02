import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';

import { AdminComponent } from './admin.component';
import { ProductlistComponent } from './productlist/productlist.component';

const routes: Routes = [{ path: '', component: AdminComponent ,children:[
  {path:"addproduct",component:AddproductComponent},
  {path:"productlist",component:ProductlistComponent}
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
