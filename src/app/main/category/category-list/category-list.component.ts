import { merge } from 'lodash'
import { Component, OnInit, forwardRef } from '@angular/core'
import { EmbeddedDataTableAccessorService } from 'app/core/base/data-table/data-table-accessor.service'
import { Observable } from 'rxjs'
import { EntityList, Category } from 'types'
import { CategoryService } from 'app/core/services/category.service'

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

}
