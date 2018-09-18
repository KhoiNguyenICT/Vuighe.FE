import { EntityList, Category } from 'types'
import { Observable } from 'rxjs'
import { Injector, Injectable } from '@angular/core'
import { BaseApiService } from './base-api.service'

@Injectable({
  providedIn: 'root'
})

export class CategoryService extends BaseApiService<Category> {

  constructor(injector: Injector) {
    super(injector)
    this.setBaseUrl('/api/category')
  }

  getCategoryListSelected(ids: string[]) {
    return this.request('post', '/getByCategoryIds', undefined, { body: ids })
  }

  getCategoriesByFilm(filmId: string, params: {
    skip?: number,
    take?: number,
    query?: string
  }) {
    params = Object.assign({
      skip: 0,
      take: 10,
    }, params)

    return this.httpClient.get<EntityList<Category>>(this.createUrl(`/getCategoriesByFilm/${filmId}`), {
      params: this.createParams(params)
    })
  }

  removeCategoryOfFilm(categoryId: string, filmId: string) {
    return this.delete(`/${categoryId}/removeCategoryOfFilm/${filmId}`)
  }

}
