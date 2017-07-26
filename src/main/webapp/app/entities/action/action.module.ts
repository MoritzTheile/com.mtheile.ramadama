import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RamadamaSharedModule } from '../../shared';
import {
    ActionService,
    ActionPopupService,
    ActionComponent,
    ActionDetailComponent,
    ActionDialogComponent,
    ActionPopupComponent,
    ActionDeletePopupComponent,
    ActionDeleteDialogComponent,
    actionRoute,
    actionPopupRoute,
    ActionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...actionRoute,
    ...actionPopupRoute,
];

@NgModule({
    imports: [
        RamadamaSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ActionComponent,
        ActionDetailComponent,
        ActionDialogComponent,
        ActionDeleteDialogComponent,
        ActionPopupComponent,
        ActionDeletePopupComponent,
    ],
    entryComponents: [
        ActionComponent,
        ActionDialogComponent,
        ActionPopupComponent,
        ActionDeleteDialogComponent,
        ActionDeletePopupComponent,
    ],
    providers: [
        ActionService,
        ActionPopupService,
        ActionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RamadamaActionModule {}
