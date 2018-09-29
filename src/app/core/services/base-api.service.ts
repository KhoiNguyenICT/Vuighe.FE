import { BaseService } from './base.service'
import { Observable } from 'rxjs'
import { EntityList } from 'types'
export class BaseApiService<T> extends BaseService {

    list(params: {
        skip?: number,
        take?: number,
        query?: string
    }) {

        params = Object.assign({
            skip: 0,
            take: 10,
        }, params)

        return this.httpClient.get<EntityList<T>>(this.createUrl('/'), {
            params: this.createParams(params)
        })
    }

    getOne(id: string) {
        return this.get(id) as Observable<T>
    }

    create(data: any) {
        return this.post('/', undefined, data) as Observable<T>
    }

    update(id: string, data: any) {
        return this.put(`${id}`, {
            id: data.id
        }, data)
    }

    remove(id: string) {
        return this.delete(id)
    }

}
