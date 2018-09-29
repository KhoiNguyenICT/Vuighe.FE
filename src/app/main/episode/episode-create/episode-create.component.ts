import { EpisodeService } from 'app/core/services/episode.service'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { FileType, Asset } from 'types'
import { ToastrService } from 'ngx-toastr'
import { FilmService } from 'app/core/services/film.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-episode-create',
  templateUrl: './episode-create.component.html',
  styleUrls: ['./episode-create.component.css']
})
export class EpisodeCreateComponent implements OnInit {

  form: FormGroup
  isHidePreviewEpisodeThumbnailImage: boolean
  fileType: typeof FileType = FileType
  filmIdSelected: string
  filmNameSelected: string
  thumbnail: Asset

  constructor(
    private formBuilder: FormBuilder,
    private episodeService: EpisodeService,
    private filmService: FilmService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  onSubmit() {
    this.form.patchValue({ 'thumbnailId': this.thumbnail.id })
    const success = res => {
      this.router.navigate(['/episode/episode-list'])
      this.toastr.success('Episode saved successfully')
    }
    const error = res => {
      this.toastr.error(res.message)
    }
    this.episodeService.create(this.form.value).subscribe(success, error)
    console.log(this.form.value)
  }

  selectFilmForEpisode(event) {
    const success = res => {
      this.filmNameSelected = res.title
      this.toastr.success('Film select successfully')
    }
    const error = res => {
      this.toastr.error(res.message)
    }
    this.filmService.getOne(event).subscribe(success, error)
    this.filmIdSelected = event
    this.form.patchValue({ filmId: this.filmIdSelected })
  }

  onRemoveFilmSelected() {
    this.filmIdSelected = undefined
  }

  onSelectAsset(asset: Asset) {
    this.thumbnail = asset
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: undefined,
      description: undefined,
      content: undefined,
      videoSource: undefined,
      filmId: undefined,
      thumbnailId: undefined
    })
  }

}
