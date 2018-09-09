import { EpisodeService } from 'app/core/services/episode.service';
import { AssetService } from 'app/core/services/asset.service'
import { FilmService } from './services/film.service'
import { ModalModule } from 'ngx-bootstrap'
import { AuthService } from './services/auth.service'
import { BreadcrumbComponent } from './base/breadcrumb/breadcrumb.component'
import { CommonModule } from '@angular/common'
import { ConfirmationComponent } from './base/confirmation/confirmation.component'
import { DataTableComponent } from './base/data-table/data-table.component'
import { HeaderComponent } from './layout/header/header.component'
import { NgModule } from '@angular/core'
import { PageTitleComponent } from './base/page-title/page-title.component'
import { QuantityComponent } from './base/quantity/quantity.component'
import { RouterModule } from '@angular/router'
import { SearchInputComponent } from './base/search-input/search-input.component'
import { SessionService } from './services/session.service'
import { SidebarComponent } from './layout/sidebar/sidebar.component'
import { SidebarSearchComponent } from './layout/sidebar-search/sidebar-search.component'
import { UserNavComponent } from './layout/user-nav/user-nav.component'
import { LoadingComponent } from './base/loading/loading.component'
import { NoResultsComponent } from './base/no-results/no-results.component'
import { PaginationComponent } from './base/pagination/pagination.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CategoryService } from './services/category.service'
import { PreviewAssetsStorageComponent } from './base/preview-assets-storage/preview-assets-storage.component'
import { RedactorModule } from './base/redactor/redactor.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ModalModule.forRoot(),
    RedactorModule
  ],
  declarations: [
    UserNavComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarSearchComponent,
    BreadcrumbComponent,
    ConfirmationComponent,
    DataTableComponent,
    ConfirmationComponent,
    PageTitleComponent,
    PaginationComponent,
    QuantityComponent,
    SearchInputComponent,
    LoadingComponent,
    NoResultsComponent,
    PreviewAssetsStorageComponent,
  ],
  exports: [
    UserNavComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarSearchComponent,
    BreadcrumbComponent,
    NoResultsComponent,
    PageTitleComponent,
    DataTableComponent,
    ModalModule,
    PreviewAssetsStorageComponent,
    RedactorModule
  ],
  providers: [
    AuthService,
    SessionService,
    CategoryService,
    FilmService,
    AssetService,
    EpisodeService
  ]
})
export class CoreModule { }
