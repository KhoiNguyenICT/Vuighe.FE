import { ReactiveFormsModule } from '@angular/forms'
import { CoreModule } from 'app/core/core.module'
import { SettingsRoutingModule } from './settings-routing.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SettingsComponent } from './settings.component'
import { MenuComponent } from './menu/menu.component'
import { GeneralComponent } from './general/general.component'

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    CoreModule,
    ReactiveFormsModule
  ],
  declarations: [
    SettingsComponent,
    GeneralComponent,
    MenuComponent
  ]
})
export class SettingsModule { }
