import { CoreModule } from 'app/core/core.module'
import { PostListComponent } from './post-list/post-list.component'
import { PostCreateComponent } from './post-create/post-create.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PostRoutingModule } from './post-routing.module'
import { PostComponent } from './post.component'

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    CoreModule
  ],
  declarations: [
    PostComponent,
    PostCreateComponent,
    PostListComponent
  ]
})
export class PostModule { }
