import { SortDirection, FileType } from './enums'
import { HttpHeaders, HttpParams } from '@angular/common/http'
import { HttpObserve } from '@angular/common/http/src/client'

export interface IHttpClientRequestOptions {
    body?: any
    headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[]
    }
    observe?: HttpObserve
    params?:
    | HttpParams
    | {
        [param: string]: string | string[]
    }
    reportProgress?: boolean
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'
    withCredentials?: boolean
}

export interface UserData {
    fullName: string
    role: string
    userName: string
}

export interface SessionData {
    userData: UserData
    access_token: string
}

export interface EntityList<T> {
    count: number
    items: Array<T>
}

export interface QueryParams {
    page: number
    quantity: number
    sortBy: string
    sortDirective: SortDirection
    query: string
}

export interface ViewModel {
    id: string
    createdDate: Date
    updatedDate: Date
}

export interface BaseCollection {
    title: string
    description: string
    files?: Asset[]
}

export interface Asset {
    id: string
    fileName: string
    fileExtension: string
    fileSize: number
    filePath: string
    collectionId: string
    collection: Collection
}

export interface Category {
    id: string
    title: string
    description: string
    thumbnail: Asset
    categoryTags: Array<CategoryTag>
    categoryFilms: Array<CategoryFilm>
}

export interface CategoryTag {
    categoryId: string
    tagId: string
    category: Category
    tag: Tag
}

export interface Tag {
    name: string
    filmTags: Array<FilmTag>
    episodeTags: Array<EpisodeTag>
    categoryTags: Array<CategoryTag>
}

export interface CategoryFilm {
    categoryId: string
    filmId: string
    category: Category
    film: Film
}

export interface Film {
    title: string
    description: string
    content: string
    likeCount: number
    followCount: number
    viewCount: number
    thumbnail: Asset
    categoryFilms: Array<CategoryFilm>
    filmEpisodes: Array<FilmEpisode>
    filmTags: Array<FilmTag>
}

export interface FilmTag {
    filmId: string
    tagId: string
    film: Film
    tag: Tag
}

export interface Episode {
    title: string
    description: string
    content: string
    videoSource: string
    likeCount: number
    followCount: number
    viewCount: number
    thumbnail: string
    filmEpisodes: Array<FilmEpisode>
    episodeTags: Array<EpisodeTag>
}

export interface EpisodeTag {
    episodeId: string
    tagId: string
    episode: Episode
    tag: Tag
}

export interface FilmEpisode {
    filmId: string
    episodeId: string
    film: Film
    episode: Episode
}

export interface Collection {
    id: string
    title: string
}
