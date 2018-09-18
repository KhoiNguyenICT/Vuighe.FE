import { CoreModule } from 'app/core/core.module'
import { FilmRoutingModule } from './film-routing.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FilmComponent } from './film.component'
import { FilmCreateComponent } from './film-create/film-create.component'
import { FilmListComponent } from './film-list/film-list.component'
import { ReactiveFormsModule } from '@angular/forms'
import { FilmChangeCategoryComponent } from './film-change-category/film-change-category.component';
import { FilmSetCategoryComponent } from './film-set-category/film-set-category.component'

@NgModule({
  imports: [
    CommonModule,
    FilmRoutingModule,
    CoreModule,
    ReactiveFormsModule
  ],
  declarations: [
    FilmComponent,
    FilmCreateComponent,
    FilmListComponent,
    FilmChangeCategoryComponent,
    FilmSetCategoryComponent
  ]
})
export class FilmModule { }
