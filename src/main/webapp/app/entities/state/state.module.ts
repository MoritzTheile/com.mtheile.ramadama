import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RamadamaSharedModule } from '../../shared';
import {
    StateService,
    StatePopupService,
    StateComponent,
    StateDetailComponent,
    StateDialogComponent,
    StatePopupComponent,
    StateDeletePopupComponent,
    StateDeleteDialogComponent,
    stateRoute,
    statePopupRoute,
    StateResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stateRoute,
    ...statePopupRoute,
];

@NgModule({
    imports: [
        RamadamaSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        StateComponent,
        StateDetailComponent,
        StateDialogComponent,
        StateDeleteDialogComponent,
        StatePopupComponent,
        StateDeletePopupComponent,
    ],
    entryComponents: [
        StateComponent,
        StateDialogComponent,
        StatePopupComponent,
        StateDeleteDialogComponent,
        StateDeletePopupComponent,
    ],
    providers: [
        StateService,
        StatePopupService,
        StateResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RamadamaStateModule {}
