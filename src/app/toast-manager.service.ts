import { Injectable, Injector, NgZone, Inject } from '@angular/core'
import { ToastrService, ToastToken, Overlay, TOAST_CONFIG } from 'ngx-toastr'
import { DomSanitizer } from '@angular/platform-browser'

@Injectable()
export class ToastManager extends ToastrService {
  constructor(
    @Inject(TOAST_CONFIG)  token: ToastToken,
    overlay: Overlay,
    _injector: Injector,
    sanitizer: DomSanitizer,
    ngZone: NgZone
  ) {
    super(token, overlay, _injector, sanitizer, ngZone)
  }

  error(message?: any, title?: string) {
    if (Array.isArray(message)) {
      message = message.map(t => `<div>${t}</div>`).join('\n')
    }

    return super.error(message, title)
  }
}
