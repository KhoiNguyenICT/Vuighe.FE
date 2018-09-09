import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { EpisodeComponent } from './episode.component'
import { EpisodeListComponent } from './episode-list/episode-list.component'
import { EpisodeCreateComponent } from './episode-create/episode-create.component'

const routes: Routes = [
    {
        path: '',
        component: EpisodeComponent,
        children: [
            {
                path: 'episode-list',
                component: EpisodeListComponent
            },
            {
                path: 'episode-create',
                component: EpisodeCreateComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EpisodeRoutingModule { }
