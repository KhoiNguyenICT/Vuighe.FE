import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent implements OnInit {

  @Input() quantity: number
  @Input() options = [10, 20, 50]
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChanged = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  onQuantityChanged(quantity: number) {
    this.onChanged.emit(quantity)
  }

}
