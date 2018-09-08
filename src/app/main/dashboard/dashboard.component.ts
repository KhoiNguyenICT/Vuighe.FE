import { Component, OnInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  PageTitle = 'Dashboard'

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    setTimeout(() => this.toastr.success('Welcome!'))
  }

}
