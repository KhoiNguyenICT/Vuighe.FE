import { ToastrService } from 'ngx-toastr'
import { merge } from 'lodash'
import { CategoryService } from 'app/core/services/category.service'
import { Component, OnInit, ViewChild, forwardRef } from '@angular/core'
import { ModalDirective } from 'ngx-bootstrap'
import { DataTableComponent } from 'app/core/base/data-table/data-table.component'
import { EmbeddedDataTableAccessorService } from 'app/core/base/data-table/data-table-accessor.service'
import { Observable } from 'rxjs'
import { EntityList, Category } from 'types'

@Component({
  selector: 'app-film-change-category',
  templateUrl: './film-change-category.component.html',
  styleUrls: ['./film-change-category.component.css'],
  providers: [{
    provide: EmbeddedDataTableAccessorService,
    useExisting: forwardRef(() => FilmChangeCategoryComponent),
  }]
})

export class FilmChangeCategoryComponent extends EmbeddedDataTableAccessorService implements OnInit {

  @ViewChild('filmChangeCategory') modal: ModalDirective
  @ViewChild('dataTableFilmChangeCategory') dataTable: DataTableComponent
  filmId: string

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    super()
  }

  ngOnInit() {
  }

  list(params: { skip?: number; take?: number; query?: string; }): Observable<EntityList<Category>> {
    return this.categoryService.getCategoriesByFilm(this.filmId, merge(params))
  }

  open(filmId: string) {
    this.filmId = filmId
    this.dataTable.fetch()
    this.modal.show()
  }

  onRemoveCategoryOfFilm(categoryId: string) {
    const success = res => {
      this.toastr.success('Remove category of film successfully')
      this.dataTable.fetch()
    }
    const error = res => {
      this.toastr.error(res.message)
    }
    this.categoryService.removeCategoryOfFilm(categoryId, this.filmId).subscribe(success, error)
  }

}
