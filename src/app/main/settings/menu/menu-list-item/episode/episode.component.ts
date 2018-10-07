import { Component, OnInit, forwardRef, Output, EventEmitter } from '@angular/core'
import { EmbeddedDataTableAccessorService } from 'app/core/base/data-table/data-table-accessor.service'
import { EpisodeService } from 'app/core/services/episode.service'
import { Observable } from 'rxjs'
import { EntityList, Episode } from 'types'
import { merge } from 'lodash'

@Component({
  selector: 'app-episode-menu-item',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css'],
  providers: [{
    provide: EmbeddedDataTableAccessorService,
    useExisting: forwardRef(() => EpisodeComponent),
  }]
})
export class EpisodeComponent extends EmbeddedDataTableAccessorService {

  @Output() sendEpisodeId = new EventEmitter<string>()

  constructor(
    private episodeService: EpisodeService,
  ) {
    super()
  }

  list(params: { skip?: number; take?: number; query?: string; }): Observable<EntityList<Episode>> {
    return this.episodeService.list(merge(params))
  }

  onSelectEpisode(id) {
    this.sendEpisodeId.emit(id)
  }

}
