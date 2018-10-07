import { Component, forwardRef, EventEmitter, Output } from '@angular/core'
import { EmbeddedDataTableAccessorService } from 'app/core/base/data-table/data-table-accessor.service'
import { CategoryService } from 'app/core/services/category.service'
import { Observable } from 'rxjs'
import { EntityList, Category, TreeNodeItem } from 'types'
import { merge } from 'lodash'

@Component({
  selector: 'app-category-menu-item',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [{
    provide: EmbeddedDataTableAccessorService,
    useExisting: forwardRef(() => CategoryComponent),
  }]
})
export class CategoryComponent extends EmbeddedDataTableAccessorService {

  @Output() sendCategoryId = new EventEmitter<string>()
  treeNodeItem: TreeNodeItem = {} as TreeNodeItem

  constructor(
    private categoryService: CategoryService,
  ) {
    super()
  }

  list(params: { skip?: number; take?: number; query?: string; }): Observable<EntityList<Category>> {
    return this.categoryService.list(merge(params))
  }

  onSelectCategory(category) {
    this.treeNodeItem.id = category.id
    this.treeNodeItem.name = category.title
    this.sendCategoryId.emit(JSON.stringify(this.treeNodeItem))
  }

}
