import { AppGuard } from './../app.guard'
import { MainComponent } from './main.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AppGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'post',
                loadChildren: './post/post.module#PostModule'
            },
            {
                path: 'category',
                loadChildren: './category/category.module#CategoryModule'
            },
            {
                path: 'film',
                loadChildren: './film/film.module#FilmModule'
            },
            {
                path: 'episode',
                loadChildren: './episode/episode.module#EpisodeModule'
            },
            {
                path: 'settings',
                loadChildren: './settings/settings.module#SettingsModule'
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
