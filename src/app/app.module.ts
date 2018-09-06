import { AppInterceptor } from './app.interceptor'
import { ApiConfig } from './core/services/api-config'
import { AppComponent } from './app.component'
import { AppGuard } from './app.guard'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { environment } from 'environments/environment'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { LoginComponent } from './login/login.component'
import { MainModule } from './main/main.module'
import { ModalModule, BsDatepickerModule, BsDropdownModule } from 'ngx-bootstrap'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { ToastManager } from './toast-manager.service'
import { ToastrService, ToastrModule } from 'ngx-toastr'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MainModule,
    ToastrModule.forRoot({
      enableHtml: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-left',
      tapToDismiss: true
    }),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    AppGuard,
    {
      provide: ApiConfig,
      useValue: environment,
    },
    {
      provide: ToastrService,
      useClass: ToastManager,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
