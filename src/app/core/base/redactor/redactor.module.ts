import { NgModule, ModuleWithProviders } from '@angular/core'

import { RedactorComponent } from './redactor.component'
import { RedactorConfig } from './config'
import { RedactorGlobalConfig } from './redactor-global-config.class'
import { AssetService } from 'app/core/services/asset.service'
import { SessionService } from 'app/core/services/session.service'

@NgModule({
    exports: [RedactorComponent],
    declarations: [RedactorComponent]
})

export class RedactorModule {
    static forRoot(config: RedactorConfig = {}): ModuleWithProviders {
        return {
            ngModule: RedactorModule,
            providers: [
                {
                    provide: RedactorGlobalConfig,
                    useValue: config
                },
                AssetService,
                SessionService,
            ],
        }
    }
}
