import { AssetService } from 'app/core/services/asset.service'
import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core'
import { ModalDirective } from 'ngx-bootstrap'
import { FileType, Collection, Asset } from 'types'
import { CollectionService } from 'app/core/services/collection.service'
import { ToastrService } from 'ngx-toastr'

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

  constructor(
    private collectionService: CollectionService,
    private toastr: ToastrService,
    private assetService: AssetService
  ) { }

  ngOnInit() {
    this.buildCollections()
  }

  open(fileType: FileType) {
    this.fileType = fileType
    this.selectedCollectionIndex = fileType
    this.collectionId = this.convertCollectionFromNameToId(FileType[fileType])
    this.onSelectCollection(this.collectionId, this.selectedCollectionIndex)
    this.modal.show()
  }

  onSelectCollection(collectionId: string, selectedCollectionIndex: number) {
    this.isLoading = true
    this.selectedCollectionIndex = selectedCollectionIndex
    const success = res => {
      this.assets = this.assets.concat(res)
      console.log(this.assets)
      this.isLoading = false
    }

    const error = res => {
      this.toastr.error(res.message)
      this.isLoading = false
    }
    this.assetService.getAssetsByCollection(collectionId).subscribe(success, error)
  }

  uploadFile(files) {
    this.isLoading = true
    const success = res => {
      this.isLoading = false
      this.fetch()
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

  private convertCollectionFromNameToId(title: string) {
    const index = this.collections.findIndex(x => x.title.toLocaleLowerCase() === title)
    const id = this.collections[index].id
    return id
  }

  private fetch() {
    this.onSelectCollection(this.collectionId, this.selectedCollectionIndex)
  }

}
