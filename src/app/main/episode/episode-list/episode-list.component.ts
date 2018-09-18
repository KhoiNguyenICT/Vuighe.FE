import { merge } from 'lodash'
import { Component, OnInit, ViewChild, forwardRef } from '@angular/core'
import { EmbeddedDataTableAccessorService } from 'app/core/base/data-table/data-table-accessor.service'
import { DataTableComponent } from 'app/core/base/data-table/data-table.component'
import { ToastrService } from 'ngx-toastr'
import { EntityList, Episode } from 'types'
import { Observable } from 'rxjs'
import { EpisodeService } from 'app/core/services/episode.service'

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css'],
  providers: [{
    provide: EmbeddedDataTableAccessorService,
    useExisting: forwardRef(() => EpisodeListComponent),
  }]
})
export class EpisodeListComponent extends EmbeddedDataTableAccessorService implements OnInit {

  PageTitle = 'Episodes'
  @ViewChild('dataTable') dataTable: DataTableComponent

  constructor(
    private episodeService: EpisodeService,
    private toastr: ToastrService
  ) {
    super()
  }

  ngOnInit() {

  }

  list(params: { skip?: number; take?: number; query?: string; }): Observable<EntityList<Episode>> {
    return this.episodeService.list(merge(params))
  }

  onDelete(id: string) {

  }


}
