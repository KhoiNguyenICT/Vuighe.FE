import { Injectable, Injector } from '@angular/core'
import { BaseService } from './base.service'
import { ApiConfig } from './api-config'
import { AppDataStorageKey } from 'types'
import { storage } from 'utils'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  localStorageKey: string
  loginRoot: string
  sessionData: any

  constructor(injector: Injector) {
    const config = injector.get<ApiConfig>(ApiConfig)
    super(injector)
    this.setBaseUrl('/api/account')
    this.localStorageKey = AppDataStorageKey
    this.loginRoot = config.loginRoot
  }

  isActiveRouter(): Observable<boolean> {
    this.sessionData = storage.get(this.localStorageKey)
    if (this.sessionData === undefined) {
      window.location.href = this.loginRoot
    }
    const userName = this.sessionData.userData.userName
    const token = this.sessionData.access_token

    const params = { userName, token }

    const sub = this.httpClient.post<boolean>(this.createUrl('/checkToken'), params)
    return sub
  }
}
