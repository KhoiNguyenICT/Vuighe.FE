import { FilmService } from 'app/core/services/film.service'
import { Component, OnInit } from '@angular/core'
import { FileType, BaseFile } from 'types'
import { FormGroup, FormBuilder } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-film-create',
  templateUrl: './film-create.component.html',
  styleUrls: ['./film-create.component.css']
})
export class FilmCreateComponent implements OnInit {

  isHidePreviewFilmThumbnailImage: boolean
  fileType: typeof FileType = FileType
  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private filmService: FilmService,
    private toastr: ToastrService
  ) {
    this.isHidePreviewFilmThumbnailImage = false
  }

  ngOnInit() {
    this.buildForm()
  }

  onSubmit() {
    const success = res => {
      this.toastr.success('Film saved successfully')
    }
    const error = res => {
      this.toastr.error(res.messages)
    }
    this.filmService.create(this.form.value).subscribe(success, error)
  }

  onSelectAsset(asset: BaseFile) {

  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: undefined,
      description: undefined,
      content: undefined
    })
  }

}
