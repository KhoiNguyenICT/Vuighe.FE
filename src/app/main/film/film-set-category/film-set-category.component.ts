import { merge } from 'lodash'
import { CategoryService } from 'app/core/services/category.service'
import { Component, OnInit, ViewChild, forwardRef } from '@angular/core'
import { ModalDirective } from 'ngx-bootstrap'
import { DataTableComponent } from 'app/core/base/data-table/data-table.component'
import { EmbeddedDataTableAccessorService } from 'app/core/base/data-table/data-table-accessor.service'
import { Observable } from 'rxjs'
import { EntityList, Category } from 'types'

@Component({
  selector: 'app-film-set-category',
  templateUrl: './film-set-category.component.html',
  styleUrls: ['./film-set-category.component.css'],
  providers: [{
    provide: EmbeddedDataTableAccessorService,
    useExisting: forwardRef(() => FilmSetCategoryComponent),
  }]
})

export class FilmSetCategoryComponent extends EmbeddedDataTableAccessorService implements OnInit {

  @ViewChild('filmSetCategory') modal: ModalDirective
  @ViewChild('dataTableFilmSetCategory') dataTable: DataTableComponent

  constructor(
    private categoryService: CategoryService
  ) {
    super()
  }

  ngOnInit() {
  }

  list(params: { skip?: number; take?: number; query?: string; }): Observable<EntityList<Category>> {
    return this.categoryService.list(merge(params))
  }

  open() {
    this.modal.show()
  }

}
