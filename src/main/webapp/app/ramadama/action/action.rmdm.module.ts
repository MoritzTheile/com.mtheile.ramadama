import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RamadamaSharedModule } from '../../shared';
import { ActionCreateWizardComponent } from './action-create-wizard.rmdm.component';
import { ActionListComponent } from './action-list.rmdm.component';
import { StateViewComponent } from './state-view.rmdm.component';
import { ActionCreatePopupService } from './action-create-popup.service';
import { actionPopupRoute } from './action.rmdm.route';

@NgModule({
    imports: [
        RamadamaSharedModule,
        ReactiveFormsModule,
        RouterModule.forRoot(actionPopupRoute, { useHash: true }),
    ],
    exports: [
        ActionCreateWizardComponent,
        ActionListComponent,
    ],
    declarations: [
        ActionCreateWizardComponent,
        StateViewComponent,
        ActionListComponent,
    ],
    entryComponents: [
    ],
    providers: [
        ActionCreatePopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ActionRmdmModule { }
