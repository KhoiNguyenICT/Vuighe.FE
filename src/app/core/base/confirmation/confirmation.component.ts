import {
  Component,
  Directive,
  TemplateRef,
  ContentChild,
  Input, Output,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
  HostListener
} from '@angular/core'
import { ModalDirective } from 'ngx-bootstrap/modal'

export class ConfirmationComponentContext {
  $implicit: any
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[confirmation]'
})

export class ConfirmationBodyDirective {
  constructor(
    public templateRef: TemplateRef<ConfirmationComponentContext>
  ) { }
}

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})

export class ConfirmationComponent {

  @ContentChild(ConfirmationBodyDirective) bodyTemplate: ConfirmationBodyDirective
  @Input() message: string
  @Input() middleBackdrop
  @Input() modalTitle = 'Confirmation'
  @Input() showCancel = true
  @Output() confirm = new EventEmitter<string>()
  @Output() dismiss = new EventEmitter()
  @ViewChild('bodyRef', { read: ViewContainerRef }) bodyRef: ViewContainerRef
  @ViewChild('confirmationModal') modal: ModalDirective

  isSm: boolean
  data: any

  constructor() { }

  onDismiss(event: Event) {
    event.stopPropagation()
    this.dismiss.emit()
    this.modal.hide()
  }

  onConfirm(event: Event) {
    event.stopPropagation()
    this.modal.hide()
    this.data ? this.confirm.emit(this.data) : this.confirm.emit()
  }

  open(data?: any) {
    if (this.bodyTemplate) {
      this.bodyRef.createEmbeddedView(this.bodyTemplate.templateRef, { $implicit: data })
    }
    this.modal.show()
    this.data = data
  }

  clear() {
    this.bodyRef.clear()
  }

  @Input() set show(isShow) {
    isShow ? this.modal.show() : this.modal.hide()
  }

  @Input() set size(s: string) {
    this.isSm = s === 'sm'
  }

  @HostListener('click', ['$event'])
  onclick(event: Event) {
    event.stopPropagation()
  }

}

