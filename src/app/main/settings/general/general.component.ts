import { ConfigurationService } from 'app/core/services/configuration.service'
import { Asset, ConfigurationBaseKey, FileType } from 'types'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Component, OnInit, AfterViewInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  PageTitle = 'General Settings'
  form: FormGroup
  thumbnail: Asset
  favicon: Asset
  logo: Asset
  fileType: typeof FileType = FileType

  constructor(
    private formBuilder: FormBuilder,
    private configurationService: ConfigurationService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.buildForm()
    this.buildContent()
  }

  onSubmit() {
    this.form.patchValue({ 'favicon': this.favicon })
    this.form.patchValue({ 'logo': this.logo })
    this.form.patchValue({ 'thumbnail': this.thumbnail })
    const data = {
      'key': ConfigurationBaseKey.GeneralSettings,
      'value': JSON.stringify(this.form.value)
    }
    const success = res => {
      this.toastr.success('Update general settings successfully')
    }
    const error = res => {
      this.toastr.error(res.message)
    }
    this.configurationService.updateConfiguration(data).subscribe(success, error)
  }

  onSelectThumbnail(event) {
    this.thumbnail = event
  }

  onSelectLogo(event) {
    this.logo = event
  }

  onSelectFavicon(event) {
    this.favicon = event
  }

  private buildContent() {
    const success = res => {
      const data = JSON.parse(res.value)
      if (data) {
        this.favicon = data.favicon
        this.logo = data.logo
        this.thumbnail = data.thumbnail
        const siteTitle = data.siteTitle
        const tagLine = data.tagLine
        this.form.patchValue({ 'siteTitle': siteTitle })
        this.form.patchValue({ 'tagLine': tagLine })
        this.form.patchValue({ 'favicon': this.favicon })
        this.form.patchValue({ 'logo': this.logo })
        this.form.patchValue({ 'thumbnail': this.thumbnail })
      } else {
        return
      }
    }

    const error = res => {
      this.toastr.error(res.message)
    }

    this.configurationService.getConfiguration(ConfigurationBaseKey.GeneralSettings).subscribe(success, error)
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      siteTitle: undefined,
      tagLine: undefined,
      favicon: this.favicon,
      logo: this.logo,
      thumbnail: this.thumbnail
    })
  }

}
