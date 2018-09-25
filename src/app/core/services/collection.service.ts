import { BaseApiService } from './base-api.service'
import { Injectable, Injector } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class CollectionService extends BaseApiService<any> {

  constructor(injector: Injector) {
    super(injector)
    this.setBaseUrl('/api/collection')
  }

  getCollections() {
    return this.get('/getAll')
  }

}
