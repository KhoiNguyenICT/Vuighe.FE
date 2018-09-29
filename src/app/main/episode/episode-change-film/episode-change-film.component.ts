import { Component, OnInit, forwardRef, ViewChild, Output, EventEmitter, AfterContentInit } from '@angular/core'
import { EmbeddedDataTableAccessorService } from 'app/core/base/data-table/data-table-accessor.service'
import { ModalDirective } from 'ngx-bootstrap'
import { DataTableComponent } from 'app/core/base/data-table/data-table.component'
import { Observable } from 'rxjs'
import { EntityList, Film } from 'types'
import { ToastrService } from 'ngx-toastr'
import { merge } from 'lodash'
import { FilmService } from 'app/core/services/film.service'

@Component({
  selector: 'app-episode-change-film',
  templateUrl: './episode-change-film.component.html',
  styleUrls: ['./episode-change-film.component.css'],
  providers: [{
    provide: EmbeddedDataTableAccessorService,
    useExisting: forwardRef(() => EpisodeChangeFilmComponent),
  }]
})
export class EpisodeChangeFilmComponent extends EmbeddedDataTableAccessorService implements OnInit {

  @ViewChild('episodeChangeFilm') modal: ModalDirective
  @ViewChild('dataTableEpisodeChangeFilm') dataTable: DataTableComponent
  @Output() selectedFilmFormEpisode = new EventEmitter()
  isSelectedFilm: boolean
  filmIdSelected: string

  constructor(
    private toastr: ToastrService,
    private filmService: FilmService
  ) {
    super()
    this.isSelectedFilm = false
  }

  ngOnInit() {}

  list(params: { skip?: number; take?: number; query?: string; }): Observable<EntityList<Film>> {
    return this.filmService.list(merge(params))
  }

  onSelectedFilmForEpisode(filmId: string) {
    if (this.filmIdSelected === undefined) {
      this.isSelectedFilm = true
      this.filmIdSelected = filmId
      this.modal.hide()
      this.selectedFilmFormEpisode.emit(this.filmIdSelected)
    } else {
      this.isSelectedFilm = false
      this.filmIdSelected = undefined
    }
  }

  open() {
    this.modal.show()
  }

}
