import { BaseApiService } from './base-api.service'
import { Injectable, Injector } from '@angular/core'
import { Film } from 'types';

@Injectable({
  providedIn: 'root'
})
export class FilmService extends BaseApiService<Film> {

  constructor(injector: Injector) {
    super(injector)
    this.setBaseUrl('/api/film')
  }

}
