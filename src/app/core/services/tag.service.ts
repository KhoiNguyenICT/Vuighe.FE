import { BaseApiService } from './base-api.service'
import { Injectable, Injector } from '@angular/core'
import { Tag } from 'types'

@Injectable({
    providedIn: 'root'
})
export class TagService extends BaseApiService<Tag> {

    constructor(injector: Injector) {
        super(injector)
        this.setBaseUrl('/api/tag')
    }

}
