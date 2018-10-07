import { BaseIdConfiguration } from 'types'
import { BaseApiService } from './base-api.service'
import { Injectable, Injector } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AssetService extends BaseApiService<any> {

  constructor(injector: Injector) {
    super(injector)
    this.setBaseUrl('/api/asset')
  }

  upload(file, collectionId) {
    const formData = new FormData()
    formData.append('file', file)
    return this.post(`/upload/${collectionId}`, undefined, formData)
  }

  getAssetsByCollection(collectionId: string, params: any) {
    if (collectionId === undefined) {
      collectionId = BaseIdConfiguration.collectionLibraryId
    }
    return this.get(`collection/${collectionId}`, params)
  }

  getUploadPublicUrl() {
    return this.baseUrl + '/upload123'
  }
}
