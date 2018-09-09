import { Injectable } from '@angular/core'
import { SessionData, AppDataStorageKey } from 'types'
import { storage } from 'utils'

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private appDataStorageKey = AppDataStorageKey
    private sessionData: SessionData
    localStorageKey: string

    constructor() {
        this.localStorageKey = AppDataStorageKey
        this.init()
    }

    getToken(): string {
        this.sessionData = storage.get(this.localStorageKey)
        const token = this.sessionData.access_token
        return token
    }

    get refreshToken(): string {
        this.init()
        return this.get('refreshToken')
    }

    refreshSession(data) {
        this.sessionData = data
        this.sync()
    }

    get(key: string) {
        const value = this.sessionData[key]
        return value
    }

    set(key: string, value: any) {
        this.sessionData[key] = value
        this.sync()
    }

    clear() {
        this.sessionData = {} as SessionData
        this.sync()
    }

    sync() {
        storage.set(this.appDataStorageKey, this.sessionData)
    }

    private init() {
        this.sessionData = storage.get(this.appDataStorageKey) || {}
    }
}
