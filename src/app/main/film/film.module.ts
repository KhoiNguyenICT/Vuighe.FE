import { CoreModule } from 'app/core/core.module'
import { FilmRoutingModule } from './film-routing.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FilmComponent } from './film.component'
import { FilmCreateComponent } from './film-create/film-create.component'
import { FilmListComponent } from './film-list/film-list.component'
import { ReactiveFormsModule } from '@angular/forms'

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
    FilmListComponent
  ]
})
export class FilmModule { }
