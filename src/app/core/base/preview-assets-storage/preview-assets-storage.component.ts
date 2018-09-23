import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core'
import { ModalDirective } from 'ngx-bootstrap'
import { FileType } from 'types'

@Component({
  selector: 'app-preview-assets-storage',
  templateUrl: './preview-assets-storage.component.html',
  styleUrls: ['./preview-assets-storage.component.css']
})
export class PreviewAssetsStorageComponent implements OnInit {

  @Output() selected = new EventEmitter()
  @ViewChild('inputFile') inputFile: ElementRef
  @ViewChild('mediaPickerModal') modal: ModalDirective

  constructor() { }

  ngOnInit() {
  }

  open(fileType?: FileType) {
    this.modal.show()
  }

}
