import { TagService } from 'app/core/services/tag.service'
import { Tag } from 'types'
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core'
import { ModalDirective } from 'ngx-bootstrap'
import { FormGroup, FormBuilder } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-tag-update',
  templateUrl: './tag-update.component.html',
  styleUrls: ['./tag-update.component.css']
})
export class TagUpdateComponent implements OnInit {

  @ViewChild('tagCreateModal') modal: ModalDirective
  @Input() UpdateType: string

  @Output() submitForm = new EventEmitter<Tag>()
  tag: Tag = {} as Tag

  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private tagService: TagService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  open(id: string) {
    if (id) {
      const success = res => {
        this.tag = res
        this.form.patchValue(res)
      }
      const error = res => {
        this.toastr.error(res.message)
      }
      this.tagService.getOne(id).subscribe(success, error)
    }
    this.form.reset()
    this.modal.show()
  }

  hide() {
    this.modal.hide()
  }

  onSubmit() {
    this.tag.name = this.form.value.name
    this.submitForm.emit(this.tag)
    this.modal.hide()
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: undefined,
      name: undefined
    })
  }

}
