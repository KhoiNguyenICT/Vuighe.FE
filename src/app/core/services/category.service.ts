import { BaseService } from './base.service'
import { Injector, Injectable } from '@angular/core'
import { EntityList, Category } from 'types'

@Injectable({
  providedIn: 'root'
})

export class CategoryService extends BaseService {

  constructor(injector: Injector) {
    super(injector)
    this.setBaseUrl('/api/category')
  }

  list(params: {
    skip?: number,
    take?: number,
    query?: string
  }) {

    params = Object.assign({
      skip: 0,
      take: 10,
    }, params)

    return this.httpClient.get<EntityList<Category>>(this.createUrl('/'), {
      params: this.createParams(params)
    })
  }

}
