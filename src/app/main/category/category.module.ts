import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoryComponent } from './category.component'
import { CategoryListComponent } from './category-list/category-list.component'
import { CategoryCreateComponent } from './category-create/category-create.component'
import { CategoryRoutingModule } from './category-routing.module'
import { CoreModule } from 'app/core/core.module'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    CoreModule,
    ReactiveFormsModule
  ],
  declarations: [
    CategoryComponent,
    CategoryListComponent,
    CategoryCreateComponent]
})
export class CategoryModule { }
