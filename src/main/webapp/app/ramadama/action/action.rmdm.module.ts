import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RamadamaSharedModule } from '../../shared';
import { ActionCreateComponent } from './action-create.rmdm.component';
import { ActionCreateWizardComponent } from './action-create-wizard.rmdm.component';
import { ActionListComponent } from './action-list.rmdm.component';
import { StateCreateComponent } from './state-create.rmdm.component';
import { StateViewComponent } from './state-view.rmdm.component';

@NgModule({
    imports: [
        RamadamaSharedModule,
        ReactiveFormsModule,
    ],
    exports: [
        ActionCreateComponent,
        ActionCreateWizardComponent,
        ActionListComponent,
    ],
    declarations: [
        ActionCreateComponent,
        ActionCreateWizardComponent,
        StateCreateComponent,
        StateViewComponent,
        ActionListComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ActionRmdmModule { }
