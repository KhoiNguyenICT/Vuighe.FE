import { SessionService } from './../core/services/session.service'
import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import * as jwtDecode from 'jwt-decode'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  token: string
  constructor(
    private activatedRoute: ActivatedRoute,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.listenRouter()
    const userData = this.decodeToken(this.token)
    const sessionData = {
      userData: userData,
      access_token: this.token
    }
    this.sessionService.refreshSession(sessionData)
    this.router.navigate(['/main/dashboard'])
  }

  private listenRouter() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.token = params['token']
    })
  }

  private decodeToken(token: string) {
    const payload = jwtDecode(token)
    return {
      role: payload.role,
      userName: payload.userName,
      fullName: payload.fullName,
    }
  }

}
