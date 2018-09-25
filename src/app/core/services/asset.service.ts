import { BaseApiService } from './base-api.service'
import { Injectable, Injector } from '@angular/core'
import { HttpEventType } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AssetService extends BaseApiService<any> {

  constructor(injector: Injector) {
    super(injector)
    this.setBaseUrl('/api/asset')
  }

  upload(file, collectionId) {
    // tslint:disable-next-line:no-debugger
    debugger
    const formData = new FormData()
    formData.append('file', file)
    return this.post(`/upload/${collectionId}`, undefined, formData)
  }

  getAssetsByCollection(collectionId: string) {
    return this.get(`collection/${collectionId}`)
  }
}
