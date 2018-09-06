import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { EntityList } from 'types'

@Injectable()
export abstract class EmbeddedDataTableAccessorService {
  abstract list(params: {
    skip?: number,
    take?: number,
    sorts?: string[],
    query?: string,
  }): Observable<EntityList<any>>
}
