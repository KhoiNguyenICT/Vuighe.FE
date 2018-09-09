import { BaseApiService } from './base-api.service'
import { Injectable, Injector } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Asset } from 'types'

@Injectable({
  providedIn: 'root'
})
export class AssetService extends BaseApiService<any> {

  constructor(injector: Injector) {
    super(injector)
    this.setBaseUrl('/api/asset')
  }

  uploadAndExtractImagesFromPowerPoint(data: FormData) {
    return this.post('/uploadAndExtractImagesFromPowerPoint', undefined, data)
  }

  uploadAndConvertPowerPointToImages(data: FormData) {
    return this.post('/uploadAndConvertPowerPointToImages', undefined, data)
  }

  getUploadPublicUrl() {
    return this.baseUrl + '/uploadPublic'
  }

  uploadFiles(files: FormData): Observable<Array<Asset>> {
    return this.httpClient.post<Array<Asset>>(this.baseUrl + '/uploadFiles', files)
  }

  upload(asset: any) {
    if (asset && asset.url && asset.url instanceof Blob) {
      return this.uploadFile(asset.url, asset.fileName)
    } else if (asset && asset instanceof Blob) {
      return this.uploadFile(asset, 'fileUpload')
    } else {
      return of(asset)
    }
  }

  private uploadFile(file: Blob | File, fileName: string) {
    const form = new FormData()
    form.append('file', file, fileName)
    return this.httpClient.post(this.baseUrl + '/uploadFile', form)
  }
}
