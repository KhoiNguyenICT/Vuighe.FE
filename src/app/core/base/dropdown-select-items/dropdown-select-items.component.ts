import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-dropdown-select-items',
  templateUrl: './dropdown-select-items.component.html',
  styleUrls: ['./dropdown-select-items.component.scss']
})
export class DropdownSelectItemsComponent implements OnInit {

  @Input() showDropdownBody: boolean

  iconButtonShowDropdownBody = 'fas fa-caret-up'

  constructor() { }

  ngOnInit() {}

  onShowDropdown() {
  }

}
