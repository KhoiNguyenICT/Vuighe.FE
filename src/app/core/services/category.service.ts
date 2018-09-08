import { Injector, Injectable } from '@angular/core'
import { Category } from 'types'
import { BaseApiService } from './base-api.service'

@Injectable({
  providedIn: 'root'
})

export class CategoryService extends BaseApiService<Category> {

  constructor(injector: Injector) {
    super(injector)
    this.setBaseUrl('/api/category')
  }

}
