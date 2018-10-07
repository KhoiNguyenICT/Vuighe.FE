import { Component, OnInit, forwardRef, Output, EventEmitter } from '@angular/core'
import { EmbeddedDataTableAccessorService } from 'app/core/base/data-table/data-table-accessor.service'
import { FilmService } from 'app/core/services/film.service'
import { Observable } from 'rxjs'
import { EntityList, Film } from 'types'
import { merge } from 'lodash'

@Component({
  selector: 'app-film-menu-item',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
  providers: [{
    provide: EmbeddedDataTableAccessorService,
    useExisting: forwardRef(() => FilmComponent),
  }]
})
export class FilmComponent extends EmbeddedDataTableAccessorService {

  @Output() sendEpisodeId = new EventEmitter<string>()

  constructor(
    private filmService: FilmService,
  ) {
    super()
  }

  list(params: { skip?: number; take?: number; query?: string; }): Observable<EntityList<Film>> {
    return this.filmService.list(merge(params))
  }

  onSelectCategory(id) {
    this.sendEpisodeId.emit(id)
  }
}
