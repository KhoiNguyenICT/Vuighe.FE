import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { CoreModule } from 'app/core/core.module'
import { EpisodeComponent } from './episode.component'
import { EpisodeCreateComponent } from './episode-create/episode-create.component'
import { EpisodeListComponent } from './episode-list/episode-list.component'
import { EpisodeRoutingModule } from './episode-routing.module'
import { NgModule } from '@angular/core';
import { EpisodeChangeFilmComponent } from './episode-change-film/episode-change-film.component'

@NgModule({
  imports: [
    CommonModule,
    EpisodeRoutingModule,
    CoreModule,
    ReactiveFormsModule
  ],
  declarations: [
    EpisodeComponent,
    EpisodeCreateComponent,
    EpisodeListComponent,
    EpisodeChangeFilmComponent
  ]
})
export class EpisodeModule { }
