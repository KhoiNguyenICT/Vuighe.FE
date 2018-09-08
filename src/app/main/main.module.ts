import { CategoryModule } from './category/category.module';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MainComponent } from './main.component'
import { MainRoutingModule } from './main-routing.module'
import { CoreModule } from '../core/core.module'

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    CoreModule,
    CategoryModule
  ],
  declarations: [MainComponent]
})
export class MainModule { }
