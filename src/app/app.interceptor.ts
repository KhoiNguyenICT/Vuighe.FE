import { storage } from 'utils'
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http'
import { SessionData, AppDataStorageKey } from 'types'
export class AppInterceptor implements HttpInterceptor {

    sessionData: SessionData

    constructor () {
        this.sessionData = storage.get(AppDataStorageKey)
    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const newRequest = req.clone({
            headers: req.headers.set(
                'Authorization', `bearer ${this.sessionData.access_token}`
            )
        })
        return next.handle(newRequest)
    }
}
