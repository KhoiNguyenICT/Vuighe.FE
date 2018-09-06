import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core'
import { range, omitBy, pick, isUndefined, trim } from 'lodash'
import { ActivatedRoute } from '@angular/router'
import { merge } from 'utils'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() includeParams = 'page,query,quantity'
  @Input() quantity: number
  @Input() total: number
  @Input() page: number
  @Input() length: number
  @Input() totalPages: number
  @Input() noQuantitySelector = false
  @Output() change = new EventEmitter()
  @Input() useLink = true
  @Input() root = '.'
  @Input() showInfo = true
  @Input() numberOfShowPages = 3


  pages: Array<number>
  params

  get start(): number {
    return (this.page - 1) * this.quantity + 1
  }

  get end(): number {
    return (this.page - 1) * this.quantity + this.length
  }

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnChanges() {
    this.prepareDisplayPages()
  }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.params = params
      })
    this.prepareDisplayPages()
  }

  getLink(page: number) {
    const includes = this.includeParams.split(',').map(trim)
    const currentParams = this.route.snapshot.params
    const newParams = omitBy(pick(merge(currentParams, { page }), includes), isUndefined)
    return newParams
  }

  navigate(page: number) {
    if (page > this.totalPages || page < 1 || page === this.page) {
      return
    }
    this.change.emit(page)
  }

  private prepareDisplayPages() {
    const distance = Math.floor(this.numberOfShowPages / 2)
    const start = Math.max(this.page - distance, 1)
    const end = Math.min(start + this.numberOfShowPages - 1, this.totalPages)
    let displayPages = range(start, end + 1)
    if (!displayPages.length) {
      displayPages = [1]
    }
    this.pages = displayPages
  }

}
