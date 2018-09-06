import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onUpdatedQuery = new EventEmitter()
  @Input() query: string

  constructor() { }

  onKeyUp(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.filterUpdated()
    }
  }

  emptySearch() {
    this.query = ''
    this.filterUpdated()
  }

  private filterUpdated() {
    this.onUpdatedQuery.emit(this.query)
  }


}
