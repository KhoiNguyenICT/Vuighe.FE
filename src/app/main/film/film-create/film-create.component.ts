import { Router } from '@angular/router'
import { DataTableComponent } from 'app/core/base/data-table/data-table.component'
import { EmbeddedDataTableAccessorService } from 'app/core/base/data-table/data-table-accessor.service'
import { FilmService } from 'app/core/services/film.service'
import { Component, OnInit, ViewChild, forwardRef } from '@angular/core'
import { FileType, EntityList, Category, CategoryFilm, Asset } from 'types'
import { FormGroup, FormBuilder } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { CategoryService } from 'app/core/services/category.service'
import { Observable } from 'rxjs'
import { v4 } from 'uuid'

@Component({
  selector: 'app-film-create',
  templateUrl: './film-create.component.html',
  styleUrls: ['./film-create.component.css'],
  providers: [{
    provide: EmbeddedDataTableAccessorService,
    useExisting: forwardRef(() => FilmCreateComponent),
  }]
})
export class FilmCreateComponent extends EmbeddedDataTableAccessorService implements OnInit {

  isHidePreviewFilmThumbnailImage: boolean
  fileType: typeof FileType = FileType
  form: FormGroup
  @ViewChild('datatableCategories') datatableCategories: DataTableComponent
  categories: Category[] = [] as Category[]
  categoryFilms: CategoryFilm[] = [] as CategoryFilm[]
  filmId: string
  thumbnail: Asset

  constructor(
    private formBuilder: FormBuilder,
    private filmService: FilmService,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private router: Router,
  ) {
    super()
    this.isHidePreviewFilmThumbnailImage = false
  }

  ngOnInit() {
    this.buildForm()
  }

  list(params: { skip?: number; take?: number; query?: string; }): Observable<EntityList<Category>> {
    return this.categoryService.list(params)
  }

  onSubmit() {
    this.form.patchValue({ 'thumbnailId': this.thumbnail.id })
    this.categoryFilms = []
    this.filmId = v4()

    for (const category of this.categories) {
      const categoryFilm = {
        categoryId: category.id,
        filmId: this.filmId
      } as CategoryFilm
      this.categoryFilms.push(categoryFilm)
    }

    const data = { ...this.form.value, categoryFilms: this.categoryFilms }
    const success = res => {
      this.router.navigate(['/film/film-list'])
      this.toastr.success('Film saved successfully')
    }
    const error = res => {
      this.toastr.error(res.messages)
    }
    this.filmService.create(data).subscribe(success, error)
  }

  onSelectCategoryIds(event) {
    const success = res => {
      this.categories = res
      this.toastr.success('Categories selected successfully')
    }
    const error = res => {
      this.toastr.error(res.messages)
    }
    this.categoryService.getCategoryListSelected(event).subscribe(success, error)
  }

  onDeleteCategory(id: string) {
    const index = this.categories.indexOf(this.categories.find(x => x.id === id))
    this.categories.splice(index, 1)
    console.log(this.categories)
  }

  onSelectAsset(asset: Asset) {
    this.thumbnail = asset
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: undefined,
      description: undefined,
      content: undefined,
      thumbnailId: undefined
    })
  }

}
