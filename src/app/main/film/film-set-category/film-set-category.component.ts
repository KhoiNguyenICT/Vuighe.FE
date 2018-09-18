import { Component, OnInit, ViewChild, forwardRef, Output, EventEmitter } from '@angular/core'
import { EmbeddedDataTableAccessorService } from 'app/core/base/data-table/data-table-accessor.service'
import { ModalDirective } from 'ngx-bootstrap'
import { DataTableComponent } from 'app/core/base/data-table/data-table.component'
import { CategoryService } from 'app/core/services/category.service'
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
  @ViewChild('datatableCategories') dataTable: DataTableComponent
  categoryIds: string[] = [] as string[]
  @Output() getCategoryIds = new EventEmitter()

  constructor(
    private categoryService: CategoryService
  ) {
    super()
  }

  ngOnInit() {
  }

  list(params: { skip?: number; take?: number; query?: string; }): Observable<EntityList<Category>> {
    return this.categoryService.list(params)
  }

  open() {
    this.modal.show()
  }

  setCategory(categoryId: string) {
    const index = this.categoryIds.indexOf(categoryId)
    if (index !== -1) {
      this.categoryIds.splice(index, 1)
    } else {
      this.categoryIds.push(categoryId)
    }
  }

  onSubmit() {
    this.getCategoryIds.emit(this.categoryIds)
    this.modal.hide()
  }

  onCancel() {
    this.modal.hide()
  }

}
