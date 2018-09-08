import { ToastrService } from 'ngx-toastr'
import { CategoryService } from 'app/core/services/category.service'
import { Component, OnInit } from '@angular/core'
import { BaseFile, FileType } from 'types'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

  isHidePreviewCategoryThumbnailImage: boolean
  fileType: typeof FileType = FileType
  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    this.isHidePreviewCategoryThumbnailImage = false
  }

  ngOnInit() {
    this.buildForm()
  }

  onSubmit() {
    const success = res => {
      this.toastr.success('Category saved successfully')
    }
    const error = res => {
      this.toastr.error(res.messages)
    }
    this.categoryService.create(this.form.value).subscribe(success, error)
  }

  onSelectAsset(asset: BaseFile) {

  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: undefined,
      description: undefined
    })
  }

}
