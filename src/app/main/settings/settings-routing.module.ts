import { TagsComponent } from './tags/tags.component'
import { MenuComponent } from './menu/menu.component'
import { SettingsComponent } from './settings.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { GeneralComponent } from './general/general.component'

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            {
                path: 'general',
                component: GeneralComponent
            },
            {
                path: 'menu',
                component: MenuComponent
            },
            {
                path: 'tags',
                component: TagsComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
