import { merge } from 'lodash'
import { Component, OnInit, forwardRef, ViewChild } from '@angular/core'
import { EmbeddedDataTableAccessorService } from 'app/core/base/data-table/data-table-accessor.service'
import { Observable } from 'rxjs'
import { EntityList, Category } from 'types'
import { CategoryService } from 'app/core/services/category.service'
import { ToastrService } from 'ngx-toastr'
import { DataTableComponent } from 'app/core/base/data-table/data-table.component'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [{
    provide: EmbeddedDataTableAccessorService,
    useExisting: forwardRef(() => CategoryListComponent),
  }]
})
export class CategoryListComponent extends EmbeddedDataTableAccessorService implements OnInit {

  PageTitle = 'Categories'
  @ViewChild('dataTable') dataTable: DataTableComponent

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    super()
  }

  ngOnInit() {
  }

  list(params: { skip?: number; take?: number; query?: string; }): Observable<EntityList<Category>> {
    return this.categoryService.list(merge(params))
  }

  onDelete(id: string) {
    const success = res => {
      this.dataTable.fetch()
      this.toastr.success('Category deleted successfully')
    }
    const error = res => {
      this.toastr.error(res.messages)
    }
    this.categoryService.remove(id).subscribe(success, error)
  }

}
