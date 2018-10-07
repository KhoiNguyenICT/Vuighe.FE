import { FormGroup } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { merge } from 'utils'
import { Component, forwardRef, ViewChild } from '@angular/core'
import { EmbeddedDataTableAccessorService } from 'app/core/base/data-table/data-table-accessor.service'
import { EntityList, Tag } from 'types'
import { Observable } from 'rxjs'
import { TagService } from 'app/core/services/tag.service'
import { DataTableComponent } from 'app/core/base/data-table/data-table.component'

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  providers: [{
    provide: EmbeddedDataTableAccessorService,
    useExisting: forwardRef(() => TagsComponent),
  }]
})
export class TagsComponent extends EmbeddedDataTableAccessorService {

  PageTitle = 'List of tags'
  isLoading: boolean
  @ViewChild('datatableTags') datatableTags: DataTableComponent

  constructor(
    private tagService: TagService,
    private toastr: ToastrService
  ) {
    super()
  }

  list(params: { skip?: number; take?: number; query?: string; }): Observable<EntityList<Tag>> {
    return this.tagService.list(merge(params))
  }

  onCreate(tag: Tag) {
    this.isLoading = true
    const data = {
      'name': tag.name
    }
    const success = () => {
      this.isLoading = false
      this.datatableTags.fetch()
      this.toastr.success('Create tag successfully')
    }
    const error = res => {
      this.isLoading = false
      this.toastr.error(res.message)
    }
    this.tagService.create(data).subscribe(success, error)
  }

  onUpdate(tag: Tag) {
    this.isLoading = true
    const success = () => {
      this.isLoading = false
      this.datatableTags.fetch()
      this.toastr.success('Update tag successfully')
    }
    const error = res => {
      this.isLoading = false
      this.toastr.error(res.message)
    }
    this.tagService.update(tag.id, tag).subscribe(success, error)
  }

  onDelete(tag: Tag) {
    console.log(tag)
    const success = res => {
      this.datatableTags.fetch()
      this.toastr.success('Delete tag successfully')
    }
    const error = res => {
      this.toastr.error(res.message)
    }
    this.tagService.remove(tag.id).subscribe(success, error)
  }

}
