import { EpisodeService } from 'app/core/services/episode.service'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { FileType, BaseFile } from 'types'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-episode-create',
  templateUrl: './episode-create.component.html',
  styleUrls: ['./episode-create.component.css']
})
export class EpisodeCreateComponent implements OnInit {

  form: FormGroup
  isHidePreviewEpisodeThumbnailImage: boolean
  fileType: typeof FileType = FileType

  constructor(
    private formBuilder: FormBuilder,
    private episodeService: EpisodeService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  onSubmit() {
    const success = res => {
      this.toastr.success('Episode saved successfully')
    }
    const error = res => {
      this.toastr.error(res.messages)
    }
    this.episodeService.create(this.form.value).subscribe(success, error)
  }

  onSelectAsset(asset: BaseFile) {

  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: undefined,
      description: undefined,
      content: undefined,
      videoSource: undefined,
    })
  }

}
