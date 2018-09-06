import { DashboardComponent } from './dashboard.component'
import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

const route: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
