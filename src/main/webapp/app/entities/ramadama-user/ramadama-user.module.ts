import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RamadamaSharedModule } from '../../shared';
import {
    RamadamaUserService,
    RamadamaUserPopupService,
    RamadamaUserComponent,
    RamadamaUserDetailComponent,
    RamadamaUserDialogComponent,
    RamadamaUserPopupComponent,
    RamadamaUserDeletePopupComponent,
    RamadamaUserDeleteDialogComponent,
    ramadamaUserRoute,
    ramadamaUserPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ramadamaUserRoute,
    ...ramadamaUserPopupRoute,
];

@NgModule({
    imports: [
        RamadamaSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RamadamaUserComponent,
        RamadamaUserDetailComponent,
        RamadamaUserDialogComponent,
        RamadamaUserDeleteDialogComponent,
        RamadamaUserPopupComponent,
        RamadamaUserDeletePopupComponent,
    ],
    entryComponents: [
        RamadamaUserComponent,
        RamadamaUserDialogComponent,
        RamadamaUserPopupComponent,
        RamadamaUserDeleteDialogComponent,
        RamadamaUserDeletePopupComponent,
    ],
    providers: [
        RamadamaUserService,
        RamadamaUserPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RamadamaRamadamaUserModule {}
