import { BaseApiService } from './base-api.service'
import { Injectable, Injector } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService extends BaseApiService<any> {

  constructor(injector: Injector) {
    super(injector)
    this.setBaseUrl('/api/configuration')
  }

  getConfiguration(key: string) {
    return this.get(`/${key}`)
  }

  updateConfiguration(data: any) {
    return this.post('/', undefined, data)
  }
}
