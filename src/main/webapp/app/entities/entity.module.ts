import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RamadamaRamadamaUserModule } from './ramadama-user/ramadama-user.module';
import { RamadamaActionModule } from './action/action.module';
import { RamadamaStateModule } from './state/state.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        RamadamaRamadamaUserModule,
        RamadamaActionModule,
        RamadamaStateModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RamadamaEntityModule {}
