import { FilmCreateComponent } from './film-create/film-create.component'
import { FilmListComponent } from './film-list/film-list.component'
import { FilmComponent } from './film.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
    {
        path: '',
        component: FilmComponent,
        children: [
            {
                path: 'film-list',
                component: FilmListComponent
            },
            {
                path: 'film-create',
                component: FilmCreateComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FilmRoutingModule { }
