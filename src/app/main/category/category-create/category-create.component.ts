import { ToastrService } from 'ngx-toastr'
import { CategoryService } from 'app/core/services/category.service'
import { Component, OnInit } from '@angular/core'
import { FileType, Asset } from 'types'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
    selector: 'app-category-create',
    templateUrl: './category-create.component.html',
    styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

    isHidePreviewCategoryThumbnailImage: boolean
    fileType: typeof FileType = FileType
    form: FormGroup
    thumbnail: Asset

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private toastr: ToastrService,
        private router: Router,
    ) {
        this.isHidePreviewCategoryThumbnailImage = false
    }

    ngOnInit() {
        this.buildForm()
    }

    onSubmit() {
        if (this.thumbnail === undefined) {
            this.toastr.warning('You can select thumbnail before submit')
            return
        }
        this.form.patchValue({ 'thumbnailId': this.thumbnail.id })
        const success = res => {
            this.router.navigate(['/category/category-list'])
            this.toastr.success('Category saved successfully')
        }
        const error = res => {
            this.toastr.error(res.messages)
        }
        this.categoryService.create(this.form.value).subscribe(success, error)
    }

    onSelectAsset(asset: Asset) {
        this.thumbnail = asset
    }

    onRemoveThumbnail() {
        this.thumbnail = undefined
    }

    private buildForm() {
        this.form = this.formBuilder.group({
            title: undefined,
            description: undefined,
            thumbnailId: undefined
        })
    }

}
