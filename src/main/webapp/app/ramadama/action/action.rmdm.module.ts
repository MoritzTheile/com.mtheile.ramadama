import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RamadamaSharedModule } from '../../shared';
import { ActionCreateComponent } from './action-create.rmdm.component';
import { StateCreateComponent } from './state-create.rmdm.component';

@NgModule({
    imports: [
        RamadamaSharedModule,
        ReactiveFormsModule,
   ],
    exports: [
        ActionCreateComponent,
    ],
    declarations: [
        ActionCreateComponent,
        StateCreateComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ActionRmdmModule {}
