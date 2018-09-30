import { FormGroup, FormBuilder } from '@angular/forms'
import { AssetService } from 'app/core/services/asset.service'
import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter, Input } from '@angular/core'
import { ModalDirective } from 'ngx-bootstrap'
import { FileType, Collection, Asset } from 'types'
import { CollectionService } from 'app/core/services/collection.service'
import { ToastrService } from 'ngx-toastr'
import { merge } from 'utils'

@Component({
  selector: 'app-preview-assets-storage',
  templateUrl: './preview-assets-storage.component.html',
  styleUrls: ['./preview-assets-storage.component.css']
})
export class PreviewAssetsStorageComponent implements OnInit {

  @Output() selected = new EventEmitter()
  @ViewChild('inputFile') inputFile: ElementRef
  @ViewChild('mediaPickerModal') modal: ModalDirective
  collections: Collection[] = [] as Collection[]
  collection: Collection = {} as Collection
  isLoading: boolean
  progress: number
  message: string
  selectedCollectionIndex: number
  fileType: FileType
  assets: Asset[] = [] as Asset[]
  collectionId: string
  noAssetsResultMessage = 'No assets value'
  noCollectionsResultMessage = 'No collections value'
  noResultsIconClass = 'fal fa-rocket'
  isCreateCollection = false
  isEditCollection = false
  formCollection: FormGroup

  pageAsset = 1
  quantityAsset = 10

  selectedAssets: Asset[] = [] as Asset[]

  constructor(
    private collectionService: CollectionService,
    private toastr: ToastrService,
    private assetService: AssetService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildCollections()
    this.buildFormCreateCollection()
  }

  open(fileType: FileType) {
    this.fileType = fileType
    this.selectedCollectionIndex = fileType
    this.collectionId = this.convertCollectionFromNameToId(FileType[fileType])
    this.onSelectCollection(this.collectionId, this.selectedCollectionIndex)
    this.modal.show()
  }

  onSelectCollection(collectionId: string, selectedCollectionIndex: number) {
    this.pageAsset = 1
    this.quantityAsset = 10

    this.assets = []
    this.collectionId = collectionId
    this.isCreateCollection = false
    this.isEditCollection = false
    this.collection = this.getCollectionById(collectionId)
    this.selectedCollectionIndex = selectedCollectionIndex
    this.fetchAssets(collectionId)
  }

  onCreateCollection() {
    this.isCreateCollection = true
  }

  onEditColelction() {
    this.isEditCollection = true
    this.formCollection.patchValue({ title: this.collection.title })
  }

  onCancelCreateCollection() {
    this.isCreateCollection = false
  }

  onCancelUpdateCollection() {
    this.isEditCollection = false
  }

  onDeleteCollection() {
    this.isLoading = true
    const success = res => {
      this.isLoading = false
      this.fetchCollections()
      this.toastr.success('Remove collection successfully')
    }
    const error = res => {
      this.isLoading = false
      this.toastr.error(res)
    }
    this.collectionService.remove(this.collection.id).subscribe(success, error)
  }

  onSubmitCreateCollection() {
    this.isLoading = true
    const data = this.formCollection.value
    const success = res => {
      this.isLoading = false
      this.isCreateCollection = false
      this.fetchCollections()
      this.toastr.success('Create collection successfully')
    }
    const error = res => {
      this.isLoading = false
      this.toastr.error(res.message)
    }
    this.collectionService.create(data).subscribe(success, error)
  }

  onSubmitEditCollection() {
    this.isLoading = true
    const data = this.formCollection.value
    const success = res => {
      this.isLoading = false
      this.isEditCollection = false
      this.fetchCollections()
      this.toastr.success('Update collection successfully')
    }
    const error = res => {
      this.isLoading = false
      this.toastr.error(res.message)
    }
    this.collectionService.update(this.collectionId, data).subscribe(success, error)
  }

  onScrollAsset() {
    this.pageAsset++
    this.fetchAssets(this.collectionId)
  }

  onSelectAsset(asset: Asset) {
    this.selected.emit(asset)
    this.modal.hide()
  }

  uploadFile(files) {
    this.isLoading = true
    this.assets = []
    const success = res => {
      this.isLoading = false
      this.fetchAssets(this.collectionId)
      this.toastr.success('Upload file successfully')
    }
    const error = res => {
      this.isLoading = false
      this.toastr.error(res.message)
    }
    this.assetService.upload(files[0], this.collectionId).subscribe(success, error)
  }

  private buildCollections() {
    this.isLoading = true
    const success = res => {
      this.isLoading = false
      this.collections = res
    }
    const error = res => {
      this.isLoading = false
      this.toastr.error(res.message)
    }
    this.collectionService.getCollections().subscribe(success, error)
  }

  private buildFormCreateCollection() {
    this.formCollection = this.formBuilder.group({
      title: undefined
    })
  }

  private convertCollectionFromNameToId(title: string) {
    const index = this.collections.findIndex(x => x.title.toLocaleLowerCase() === title)
    const id = this.collections[index].id
    return id
  }

  private getCollectionById(id: string) {
    const index = this.collections.findIndex(x => x.id === id)
    const collection = this.collections[index]
    return collection
  }

  private fetchAssets(collectionId: string) {
    const success = res => {
      this.assets = this.assets.concat(res)
      this.isLoading = false
    }

    const error = res => {
      this.toastr.error(res.message)
      this.isLoading = false
    }
    this.assetService.getAssetsByCollection(collectionId, {
      skip: (this.pageAsset - 1) * this.quantityAsset,
      take: this.quantityAsset * this.pageAsset
    }).subscribe(success, error)
  }

  private fetchCollections() {
    this.buildCollections()
  }

}
