import { Injector, Injectable } from '@angular/core'
import { Episode } from 'types'
import { BaseApiService } from './base-api.service'

@Injectable({
  providedIn: 'root'
})

export class EpisodeService extends BaseApiService<Episode> {

  constructor(injector: Injector) {
    super(injector)
    this.setBaseUrl('/api/episode')
  }

}
