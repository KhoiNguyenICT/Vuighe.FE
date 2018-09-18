import { EmbeddedDataTableAccessorService } from 'app/core/base/data-table/data-table-accessor.service'
import { merge } from 'utils'
import { Component, OnInit, ViewChild, forwardRef } from '@angular/core'
import { FilmService } from 'app/core/services/film.service'
import { EntityList, Film } from 'types'
import { Observable } from 'rxjs'
import { DataTableComponent } from 'app/core/base/data-table/data-table.component'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css'],
  providers: [{
    provide: EmbeddedDataTableAccessorService,
    useExisting: forwardRef(() => FilmListComponent),
  }]
})
export class FilmListComponent extends EmbeddedDataTableAccessorService implements OnInit {

  PageTitle = 'Films'
  @ViewChild('dataTable') dataTable: DataTableComponent
  showModalChangeCategoryOfFilm: boolean

  constructor(
    private filmService: FilmService,
    private toastr: ToastrService
  ) {
    super()
  }

  ngOnInit() {
  }

  list(params: { skip?: number; take?: number; query?: string; }): Observable<EntityList<Film>> {
    return this.filmService.list(merge(params))
  }

  onDelete(id: string) {
    const success = res => {
      this.dataTable.fetch()
      this.toastr.success('Film deleted successfully')
    }
    const error = res => {
      this.toastr.error(res.messages)
    }
    this.filmService.remove(id).subscribe(success, error)
  }

}
