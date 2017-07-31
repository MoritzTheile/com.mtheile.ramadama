import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RamadamaSharedModule } from '../shared';
import { HOME_ROUTE, HomeComponent } from './';
import {  MyCameraComponent } from './mycamera.component';

@NgModule({
    imports: [
        RamadamaSharedModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true })
    ],
    declarations: [
        HomeComponent,
        MyCameraComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RamadamaHomeModule {}
