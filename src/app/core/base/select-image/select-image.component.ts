import { Asset } from 'types'
import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.scss']
})
export class SelectImageComponent implements OnInit {

  @Input() image: Asset

  constructor() { }

  ngOnInit() {
  }

  onRemoveImage() {
    this.image = undefined
  }

}
