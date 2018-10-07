import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { CoreModule } from 'app/core/core.module'
import { SettingsRoutingModule } from './settings-routing.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SettingsComponent } from './settings.component'
import { MenuComponent } from './menu/menu.component'
import { GeneralComponent } from './general/general.component'
import { TreeModule } from 'angular-tree-component'
import { ModalModule } from 'ngx-bootstrap'
import { CategoryComponent } from './menu/menu-list-item/category/category.component'
import { FilmComponent } from './menu/menu-list-item/film/film.component'
import { EpisodeComponent } from './menu/menu-list-item/episode/episode.component'
import { CustomLinkComponent } from './menu/menu-list-item/custom-link/custom-link.component'
import { TagsComponent } from './tags/tags.component'
import { TagUpdateComponent } from './tags/tag-update/tag-update.component'

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    TreeModule,
    ModalModule
  ],
  declarations: [
    SettingsComponent,
    GeneralComponent,
    MenuComponent,
    CategoryComponent,
    FilmComponent,
    EpisodeComponent,
    CustomLinkComponent,
    TagsComponent,
    TagUpdateComponent
  ]
})
export class SettingsModule { }
