import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RamadamaSharedModule } from '../shared';
import { HOME_ROUTE, HomeComponent } from './';
import { ActionRmdmModule } from '../ramadama/action/action.rmdm.module';

@NgModule({
    imports: [
        RamadamaSharedModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true }),
        ReactiveFormsModule,
        ActionRmdmModule,
   ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RamadamaHomeModule {}
