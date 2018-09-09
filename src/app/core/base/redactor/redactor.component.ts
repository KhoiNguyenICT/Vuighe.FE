import { Component, forwardRef, ElementRef, ViewChild, Input, Optional, OnInit, EventEmitter, Output } from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'

import { RedactorConfig } from './config'
import { RedactorGlobalConfig } from './redactor-global-config.class'
import { SessionService } from 'app/core/services/session.service'
import { AssetService } from '../../services/asset.service'

declare const $R: any

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[redactor]',
  templateUrl: './redactor.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RedactorComponent),
    multi: true,
  }],
})
export class RedactorComponent implements ControlValueAccessor, OnInit {

  @Input() enableSource = true
  @Input() enableVideo = true
  @Input() placeholder: string
  @Input() redactorOptions: RedactorConfig
  @Output() focusEditor = new EventEmitter()
  @ViewChild('content') private content: ElementRef

  private _onChange: Function
  private _onTouched: Function

  constructor(
    @Optional() private globalConfig: RedactorGlobalConfig,
    private assetApiService: AssetService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    if (!this.content) {
      throw new Error('Redactor: No content child')
    }
    const elem = this.content.nativeElement as HTMLTextAreaElement
    const plugins = [
      this.enableSource ? 'source' : undefined,
      'table',
      this.enableVideo ? 'video' : undefined,
    ].filter(it => !!it)
    let config = {
      plugins,
      imageUpload: this.assetApiService.getUploadPublicUrl(),
      accessToken: this.sessionService.getToken(),
    } as any
    config = Object.assign({},
      this.globalConfig,
      config,
      this.redactorOptions,
      {
        callbacks: {
          synced: (html) => {
            if (typeof this._onChange === 'function') {
              this._onChange(html)
            }
          },
          focus: (e) => {
            this.focusEditor.emit(e)
          },
          click: (e) => {
            this.focusEditor.emit(e)
          },
          keyup: (e) => {
            this.focusEditor.emit(e)
          },
        },
        placeholder: this.placeholder,
        breakline: true
      }
    )
    $R(elem, config)
  }

  writeValue(value) {
    if (!value) {
      return
    }
    const elem = this.content.nativeElement
    $R(elem, 'source.setCode', value)
  }

  registerOnChange(fn) {
    this._onChange = fn
  }

  registerOnTouched(fn) {
    this._onTouched = fn
  }

  setDisabledState(disabled: boolean) {
    const elem = this.content.nativeElement as HTMLTextAreaElement
    if (disabled) {
      $R(elem, 'module.editor.disable')
    } else {
      $R(elem, 'module.editor.enable')
    }

  }

}
