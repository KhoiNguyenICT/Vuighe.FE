import { CategoryCreateComponent } from './category-create/category-create.component'
import { CategoryListComponent } from './category-list/category-list.component'
import { CategoryComponent } from './category.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
    {
        path: '',
        component: CategoryComponent,
        children: [
            {
                path: 'category-list',
                component: CategoryListComponent
            },
            {
                path: 'category-create',
                component: CategoryCreateComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }
