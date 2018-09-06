import { Component, OnInit, Input } from '@angular/core'
import { merge } from 'utils'
import { QueryParams, SortDirection } from 'types'
import { EmbeddedDataTableAccessorService } from './data-table-accessor.service'

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() noResultsIconClass = 'fal fa-exclamation-triangle'
  @Input() noResultsMessage
  @Input() noTopMenu = false

  isLoading: boolean
  total: number
  totalPages: number
  items = []

  params: QueryParams = {
    page: 1,
    quantity: 10,
    sortBy: '',
    sortDirective: SortDirection.descending,
    query: ''
  }

  constructor(
    private accessor: EmbeddedDataTableAccessorService,
  ) { }

  ngOnInit() {
    this.noResultsMessage = this.noResultsMessage || 'No items found'
    this.fetch()
  }

  countIndex(index: number) {
    return (this.params.page - 1) * this.params.quantity + index + 1
  }

  onQuantityChanged(quantity: number) {
    this.params = merge(this.params, { quantity, page: 1 })
    this.fetch()
  }

  onSearch(query: string) {
    this.params.page = 1
    this.params = merge(this.params, { query, page: 1 })
    this.fetch()
  }

  onPageChange(page: number) {
    this.params.page = page
    this.fetch()
  }

  refresh() {
    this.params.page = 1
    this.fetch()
  }

  fetch() {
    const onSuccess = res => {
      this.isLoading = false
      this.items = res.items
      this.total = res.count
      this.totalPages = Math.ceil(this.total / this.params.quantity)
    }
    const onError = reason => {
      this.isLoading = false
    }

    const params = Object.assign(this.params, {
      skip: (this.params.page - 1) * this.params.quantity,
      take: this.params.quantity,
    })

    this.isLoading = true
    this.accessor.list(params).subscribe(onSuccess, onError)
  }

}
